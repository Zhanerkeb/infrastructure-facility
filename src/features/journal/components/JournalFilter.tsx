import React from "react"
import { Input, Select } from 'antd';
import 'dayjs/locale/ru';
import { SearchOutlined } from '@ant-design/icons';


import CSS from 'csstype';

const style: CSS.Properties = {
    display: 'flex',
    alignItems: 'center',
}

const titleStyle: CSS.Properties = {
    marginRight: '5px'
}

interface JournaFilter {
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onStatusChange: (value: string, name: string) => void;
}


const JournalFilter = ({onSearchChange, onStatusChange}: JournaFilter) => {

      const handleChange = (value: string, name: string) => {
        onStatusChange(value, name)
      };

    return(
        <div style={{margin: '20px 0', display: 'flex', justifyContent: 'space-between'}}>
            <div style={style}>
                <p style={titleStyle}>Сортировать по</p>
                <Select
                    defaultValue="Дата приёма"
                    style={{ width: 170 }}
                    onChange={(value) => handleChange(value, 'sort')}
                    options={[
                        { value: 'date_of_receipt', label: 'Дата приёма' },
                        { value: 'price', label: 'Получатель' }
                    ]}
                />
            </div>
            <div style={style}>
                <p style={titleStyle}>Статус</p>
                <Select
                    defaultValue="На складе"
                    style={{ width: 170 }}
                    onChange={(value) => handleChange(value, 'status')}
                    options={[
                        { value: 'На складе', label: 'На складе' },
                        { value: 'Просрочен', label: 'Просрочен' },
                        { value: 'Отгружен', label: 'Отгружен' },
                        { value: 'ВСЕ', label: 'ВСЕ' },
                    ]}
                />
            </div>
            <div style={style}>
                <Input prefix={<SearchOutlined />} onChange={onSearchChange} style={{width: 200}} name={'number_td_mdp'} placeholder="Номер ТД"/>
            </div>
        </div>
    )
}

export default JournalFilter