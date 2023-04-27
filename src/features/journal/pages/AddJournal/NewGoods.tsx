import React from "react"
import { Input, Upload, Button, InputNumber, theme } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import 'dayjs/locale/ru';
import type { UploadProps } from 'antd/es/upload/interface';
import {NavLink} from 'react-router-dom'

const style = {
    margin: '20px 0'
}

const titleStyle = {
    fontSize: '14px',
    fontWeight: 500
}

interface AddJournalInputs {
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInputNumberChange: (value: number | string | null, name: string) => void;
    handleStep: () => void;
    onSave: () => void;
    goods: any,
    uploadProps: UploadProps
}

const NewGoods = ({onInputChange, handleStep, onInputNumberChange, onSave, goods, uploadProps}: AddJournalInputs) => {
    const {
        token: { colorSuccessBg },
      } = theme.useToken();

    return(
        <div>
            <div style={{margin: '20px 40px', backgroundColor: '#fff', padding: ' 30px'}}>
               <div style={{fontWeight: 600, fontSize: '20px', marginBottom: '20px'}}>
                II.  Оформление товара
               </div>
               <div style={{padding: '20px 70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{width: 'calc(50% - 150px)'}}>
                        <div style={style}>
                            <p style={titleStyle}>Наименование товара</p>
                            <Input value={goods.name} onChange={onInputChange} name={'name'}/>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Количество</p>
                            <InputNumber value={goods.count} onChange={(value) => onInputNumberChange(value, 'count')} name={'count'}/>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Вес брутто (кг)</p>
                            <InputNumber value={goods.gross_weight} onChange={(value) => onInputNumberChange(value, 'gross_weight')} name={'gross_weight'}/>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Стоимость ($)</p>
                            <InputNumber value={goods.price} onChange={(value) => onInputNumberChange(value, 'price')} name={'price'}/>
                        </div>
                    </div>
                    <div  style={{width: 'calc(50% - 150px)'}}>
                        <div style={style}>
                            <p style={titleStyle}>Вес нетто (кг)</p>
                            <InputNumber  value={goods.net_weight} onChange={(value) => onInputNumberChange(value, 'net_weight')} name={'net_weight'}/>
                        </div>
                    </div>
                   
               </div>
               <div style={{fontWeight: 600, fontSize: '20px', marginBottom: '20px'}}>
                III.  Документы
                    <div style={{padding: '20px 70px'}}>
                    <Upload {...uploadProps}>
                         <Button icon={<UploadOutlined />}>Выберите файл</Button>
                    </Upload>
                    {typeof goods.documents == 'string' ?<p style={{marginTop: '20px', fontSize: '14px'}}>{goods.documents}</p>  : ''}
                    </div>
               </div>
               <div style={{fontWeight: 600, fontSize: '20px', marginBottom: '20px'}}>
                IV. Расположение на складе
               </div>
               <div style={{padding: '20px 70px', display: 'flex', alignItems: 'center'}}>
                    <div>
                        <p style={titleStyle}>Номер ячейки</p>
                        <Input style={{width: '100%'}} value={goods.place} onChange={onInputChange} name={'place'}/>
                    </div>
                    <div style={{}}>
                       
                        <NavLink style={{ marginLeft: '40px', display: 'flex', alignItems: 'center',color: 'rgba(112, 112, 112, 0.7)'}} to="/dashboard/scheme" target="_blank">
                            <img style={{marginRight: '10px'}} src="/images/map.svg" alt="map"/>
                            Просмотр карты СВХ
                        </NavLink>
                    </div>
                    
               </div>
               
               <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px 70px'}}>
                <Button type="primary" onClick={handleStep}>
                    Назад
                </Button>
                <Button style={{backgroundColor: colorSuccessBg}} type="primary" onClick={onSave}>
                    Сохранить
                </Button>
            </div>
            </div>
          
        </div>
    )
}

export default NewGoods