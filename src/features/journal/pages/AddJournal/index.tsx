import React, {useEffect, useState} from 'react'
import NewGoods from "./NewGoods"
import NewJournal from "./NewJournal"
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

import { goodsActions, selectAddSuccess, selectCountries, selectEditSuccess, selectGoods, selectReceivers, selectRegNumber } from '../../goodsSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Goods } from '../../../../models/goods';
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { message } from 'antd';
import {useLocation} from "react-router-dom";


const AddJournal = () => {
    const dispatch = useAppDispatch();
    const addSuccess = useAppSelector(selectAddSuccess)
    const editSuccess = useAppSelector(selectEditSuccess)
    const regNumber = useAppSelector(selectRegNumber)
    const editGoods = useAppSelector(selectGoods)
    const countries = useAppSelector(selectCountries)
    const receivers = useAppSelector(selectReceivers)
    const navigate = useNavigate()
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { id } = useParams<{ id: string }>();
    const requiredJournalFields: string[] = ['reg_number_vh', 'number_td_mdp', 'departure_country',
    'carrier_country', 'reciver', 'carrier_name', 'way_of_transportation', 'date_of_receipt', 'bin']

    const [goods, setGoods] = useState<object>({})
    let [step, setStep] = useState<number>(1)
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname === '/dashboard/new-journal') {
            setGoods({})
        } else {
            setGoods(editGoods)
        }
    }, [location]);

   

    useEffect(() => {
        dispatch(goodsActions.fetchRegNumber());
        dispatch(goodsActions.fetchCountry());
        dispatch(goodsActions.fetchReceiver());
        if (id) {
            dispatch(goodsActions.getById(parseInt(id)));
        } 
    }, [dispatch])


    useEffect(() => {
       if(addSuccess || editSuccess) {
        navigate('/dashboard/journal')
        dispatch(goodsActions.clearStatuses())
       }

    }, [addSuccess, editSuccess])

    useEffect(() => {
        setGoods(editGoods);
    }, [editGoods])

    useEffect(() => {
        setGoods({reg_number_vh: regNumber})
    }, [regNumber, location])


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const data = {[e.target.name]: e.target.value}
       setGoods({...goods, ...data})
    }

    const onInputNumberChange = (value: number | string | null, name: string) => {
        setGoods({...goods, [name]: value})
     }

    const onSelectChange = (value: string, name: string) => {
       setGoods({...goods, [name]: value})
    }

    const onCheckboxChange = (checkedValues: CheckboxValueType[]) => {
        setGoods({...goods, way_of_transportation: JSON.stringify(checkedValues)})
    }

    const onDateChange = (dateString: string, name: string) => {
        setGoods({...goods, [name]: dateString})
    };

    const handleStep = () => {
        if (step == 2) {
            setStep(1)
        } else {
            const isFilled = requiredJournalFields.every((field ) => goods[field as keyof typeof goods])
            console.log(isFilled)
            if(isFilled) {
                setStep(2)
            } else {
                message.error('Заполните все обязательные поля')
            }
           
        }
    }
    const addEntity = (value: string, name: string) => {
        dispatch(name == 'receiver' ? goodsActions.addReceiver(value) : goodsActions.addCountry(value))

    };

    const onSave = () => { 
        const data: any = {...goods}
        if (data.number_td_mdp ) {
            data.code_too = data.number_td_mdp.substring(0,8)
        }
        if (!data.upload_date) {
            delete data.upload_date
        }
        dispatch(
           id ?  goodsActions.editGoods(data as Goods) : goodsActions.addGoods(data as Goods)
        );
    }

    const uploadProps: UploadProps = {
        onRemove: (file) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          setFileList(newFileList);
        },
        beforeUpload: (file) => {
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
            message.error('Можно загружать только PDF файл')
            return
        }
        const isLt2M = file.size / 1024 / 1024 < 20;
          if (!isLt2M) {
           message.error('Размер файла не должен превышать 20 МБ')
           return
          }
          setFileList([...fileList, file]);
          setGoods({...goods, documents: file})
          return false;
        },
        fileList,
    };
console.log(receivers)
    return(
        <div>
             <div style={{fontWeight: 600, fontSize: '24px', borderBottom: '2px solid #e7e7e7', paddingBottom: '20px'}}>
                ВНЕСЕНИЕ ТОВАРА НА УЧЁТ
            </div>
            {step == 1 ?   <NewJournal 
                                goods={goods}
                                onInputChange={onInputChange}
                                onSelectChange={onSelectChange} 
                                onCheckboxChange={onCheckboxChange} 
                                onDateChange={onDateChange}
                                handleStep={handleStep}
                                addEntity={addEntity}
                                receivers={receivers}
                                countries={countries}
            /> : <NewGoods 
                    uploadProps={uploadProps}
                    goods={goods}
                    onInputNumberChange={onInputNumberChange}
                    onInputChange={onInputChange}
                    handleStep={handleStep}
                    onSave={onSave}
                   
                  
        />}
          
            
        </div>
    )
}

export default AddJournal