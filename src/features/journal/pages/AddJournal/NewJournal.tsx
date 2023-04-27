import React, { useState } from "react"
import { Input, Select, Checkbox, DatePicker, Button, Popconfirm } from "antd"
import { MaskedInput } from "../../../../components/MaskedInput/MaskedInput"
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import 'dayjs/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

const style = {
    margin: '20px 0'
}

const titleStyle = {
    fontSize: '14px',
    fontWeight: 500
}

interface AddJournalInput {
    goods: any,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectChange: (value: string, name: string) => void;
    addEntity: (value: string, name: string) => void;
    onCheckboxChange: (values: CheckboxValueType[]) => void;
    onDateChange: (dateString: string, name: string) => void;
    handleStep: () => void;
    receivers: any;
    countries: any;
}


const NewJournal = ({onInputChange, onSelectChange, onCheckboxChange, onDateChange, handleStep, goods,  addEntity, receivers, countries}: AddJournalInput) => {
    const [entity, setEntity] = useState<any>({})
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEntity({...entity, [e.target.name]: e.target.value})
    }
    const navigate = useNavigate()
    console.log(receivers, goods.reciver)
    return(
        <div>
            <div style={{margin: '20px 40px', backgroundColor: '#fff', padding: ' 30px'}}>
               <div style={{ display: 'flex', justifyContent: 'space-between',  marginBottom: '20px'}}>
                   <div style={{fontSize: '20px', fontWeight: 600,}}>
                        I.  Оформление контейнера
                    </div> 
                   {goods.id && <div style={{margin: '0 70px'}}>
                        <Select
                            style={{width: '100%'}}
                            onChange={(e) => onSelectChange(e, 'status')}
                            value={goods.status}
                            options={[
                                { value: 'На складе', label: 'На складе' },
                                { value: 'Просрочен', label: 'Просрочен' },
                                { value: 'Отгружен', label: 'Отгружен' },
                                { value: 'ВСЕ', label: 'ВСЕ' },
                            ]}
                        >
                        </Select>
                    
                    </div>}
               </div>
               <div style={{padding: '20px 70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{width: 'calc(50% - 150px)'}}>
                        <div style={style}>
                            <p style={titleStyle}>Регистрационный номер ВХ *</p>
                            <MaskedInput value={goods.reg_number_vh ? goods.reg_number_vh : ''} name={'reg_number_vh'} onChange={onInputChange} mask='99999/999999/999999' placeholder='***** / ****** / ******'/>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Номер  ТД / МДП *</p>
                            <MaskedInput value={goods.number_td_mdp ? goods.number_td_mdp : ''} onChange={onInputChange} name={'number_td_mdp'} mask='99999999/999999/9999999' placeholder='******** / ****** / *******'/>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Код ТОО *</p>
                            <MaskedInput value={goods.code_too ? goods.code_too : goods.number_td_mdp ? goods.number_td_mdp.substring(0,9) : ''} onChange={onInputChange} name={'code_too'} mask='99999999' placeholder='********'/>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Номер  ДТ / ТД /  ТПО</p>
                            <MaskedInput  value={goods.number_dt_td_tpo ? goods.number_dt_td_tpo : ''} onChange={onInputChange} name={'number_dt_td_tpo'}  mask='99999/999999/9999999' placeholder='***** / ****** / *******'/>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Страна отправления *</p>
                            <div style={{display: 'flex'}}>
                                <Select
                                    style={{width: '100%', marginRight: '10px'}}
                                    onChange={(e) => onSelectChange(e, 'departure_country')}
                                   
                                    placeholder={'Выберите страну'}
                                    value={goods.departure_country ? goods.departure_country : null}
                                    options={
                                        countries.map((item: any) => {
                                            return {
                                                value: item.id,
                                                label: item.name
                                            }
                                        })
                                    }
                                >
                                </Select>
                                <Popconfirm
                                    title="Добавить страну отправления"
                                    description={<Input name={'country'} onChange={onChange}/>}
                                    onConfirm={() => addEntity(entity.country, 'country')}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                <Button>+</Button>
                                </Popconfirm>
                            </div>        
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Страна перевозчик *</p>
                            <div style={{display: 'flex'}}>
                                <Select
                                    style={{width: '100%', marginRight: '10px'}}
                                    onChange={(e) => onSelectChange(e, 'carrier_country')}
                                    placeholder={'Выберите страну'}
                                    value={goods.carrier_country ?  goods.carrier_country : null}
                                    options={ 
                                        countries.map((item: any) => {
                                        return {
                                            value: item.id,
                                            label: item.name
                                        }
                                    })}
                                    >
                                </Select>
                                <Popconfirm
                                    title="Добавить страну перевозчик"
                                    description={<Input name={'country'} onChange={onChange}/>}
                                    onConfirm={() => addEntity(entity.country, 'country')}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                <Button>+</Button>
                                </Popconfirm>
                            </div>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Получатель *</p>
                            <div style={{display: 'flex'}}>
                                <Select
                                    style={{width: '100%', marginRight: '10px'}}
                                    onChange={(e) => onSelectChange(e, 'reciver')}
                                    placeholder={'Выберите получателя'}
                                    value={goods.reciver}
                                    options={
                                        receivers.map((item: any) => {
                                            return {
                                                value: item.id,
                                                label: item.name
                                            }
                                        })
                                    }
                                >
                                </Select>
                                <Popconfirm
                                    title="Добавить получателя"
                                    description={<Input name={'receiver'} onChange={onChange}/>}
                                    onConfirm={() => addEntity(entity.receiver, 'receiver')}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                  <Button>+</Button>
                                </Popconfirm>
                            </div>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Наименование перевозчика *</p>
                            <Input  value={goods.carrier_name} onChange={onInputChange} name={'carrier_name'}/>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Способ перевозки *</p>
                            <div>
                            <Checkbox.Group 
                                value={goods.way_of_transportation ? JSON.parse(goods.way_of_transportation): []}
                                options={[
                                { label: 'Авто', value: 'auto' },
                                { label: 'Контейнер', value: 'container' },
                                { label: 'Вагон', value: 'vagon' }]} 
                                onChange={onCheckboxChange} />
                            </div>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>Номер авто-контейнеров *</p>
                            <Input value={goods.number_of_transportation}  onChange={onInputChange} name={'number_of_transportation'}/>
                        </div>
                    </div>
                    <div  style={{width: 'calc(50% - 150px)'}}>
                         <div style={style}>
                            <p style={titleStyle}>Дата приема *</p>
                            <DatePicker value={goods.date_of_receipt ? dayjs(goods.date_of_receipt) : null}  onChange={(date, dateStr) => onDateChange(dateStr, 'date_of_receipt')} placeholder="06 / 02 / 2023" locale={locale}  style={{width: '100%'}}/>
                        </div>
                        <div style={{...style, margin: '120px 0'}}>
                            <p style={titleStyle}>Дата выгрузки</p>
                            <DatePicker value={goods.upload_date ? dayjs(goods.upload_date) : null} onChange={(date, dateStr) => onDateChange(dateStr, 'upload_date')} placeholder="06 / 02 / 2023" locale={locale}  style={{width: '100%'}}/>
                        </div>
                        <div style={style}>
                            <p style={titleStyle}>БИН *</p>
                            <MaskedInput value={goods.bin ? goods.bin : ''} onChange={onInputChange} name={'bin'} mask='99999999999' placeholder='***********'/>
                        </div>
                    </div>
                   
               </div>
               <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px 70px'}}>
                <Button onClick={() => navigate('/dashboard/journal')}>
                    Назад
                </Button>
                <Button type="primary" onClick={handleStep}>
                    Далее
                </Button>
            </div>
            </div>
          
        </div>
    )
}

export default NewJournal