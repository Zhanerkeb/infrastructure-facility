import React, { useEffect, useState } from 'react';

import { Space, Table, Popconfirm, Popover } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import JournalFilter from '../components/JournalFilter';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {Goods} from '../../../models/goods'
import {
    goodsActions,
    selectGoodsList,
    selectNotificationsList,
  } from '../goodsSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { ListParams } from '../../../models/common';
import {DeleteOutlined} from '@ant-design/icons'
import { baseUrl } from '../../../api/axiosClient';

const notificationColumns: ColumnsType<Goods> = [
    {
      title: 'Дата и время помещения',
      key: 'date_of_upload_rec',
      render: (_, record) => <span>{`${new Date(record.date_of_receipt).toLocaleDateString()}`}</span>,
  
    },
    {
      title: 'Номер ДТ (или КМДП)',
      dataIndex: 'number_dt_td_tpo',
      key: 'number_dt_td_tpo',
    },
    {
      title: 'Рег. номер ВХ',
      dataIndex: 'reg_number_vh',
      key: 'reg_number_vh',
    },
    
  ];

const Journal = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<ListParams>({})
    const goodsList = useAppSelector(selectGoodsList);
    const notificationList = useAppSelector(selectNotificationsList);
    const navigate = useNavigate()

    const columns: ColumnsType<Goods> = [
        {
          title: 'Статус',
          dataIndex: 'status',
          key: 'status',
          render: (text) => <div style={{border: '1px solid #000', boxSizing: 'border-box', padding: '5px'}}>{text}</div>,
        },
        {
          title: 'Дата и время помещения',
          key: 'date_of_upload_rec',
          render: (_, record) => <span>{`${new Date(record.date_of_receipt).toLocaleDateString()}`}</span>,
          ellipsis: true
        },
        {
          title: 'Номер ДТ (или КМДП)',
          dataIndex: 'number_dt_td_tpo',
          key: 'number_dt_td_tpo',
          ellipsis: true,
        },
        {
          title: 'Рег. номер ВХ',
          dataIndex: 'reg_number_vh',
          key: 'reg_number_vh',
          ellipsis: true,
        },
        {
          title: 'Страна отправления',
          dataIndex: 'departure_country',
          key: 'departure_country',
          ellipsis: true
        },
        {
          title: 'Наименование товара',
          dataIndex: 'name',
          key: 'name',
          ellipsis: true
        },
        {
          title: 'Кол-во товара',
          dataIndex: 'count',
          key: 'count',
          ellipsis: true
        },
        {
          title: 'Стоимость ($)',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Место размещения',
          dataIndex: 'place',
          key: 'place',
          ellipsis: true
        },
      //   {
      //     title: 'Дата выдачи со склада',
      //     dataIndex: 'place',
      //     key: 'place',
      //   },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <NavLink type='text' to={`/dashboard/new-journal/${record.id}`}>
                  <img width={18} src='/images/edit.svg'/>
              </NavLink>
              <a href={`${baseUrl}goods/documents/${record.id}`} download target="_blank">
                  <img  width={18} src='/images/download.svg'/>
              </a>
              <Popconfirm
                  placement="topLeft"
                  title={'Удаление'}
                  description={'Вы действительно хотите удалить?'}
                  onConfirm={() => confirm(record.id)}
                  okText="Да"
                  cancelText="Нет"
              >
                  <DeleteOutlined style={{fontSize: 18}} />
             </Popconfirm>
            </Space>
          ),
        },
      ];

    const confirm = (id: any) => {
        dispatch(goodsActions.deleteGoods(id))
    };
    useEffect(() => {
        dispatch(goodsActions.fetchGoodsList({status: filter.status, number_td_mdp: filter.number_td_mdp, sort: filter.sort}));
    }, [dispatch, filter])

    useEffect(() => {
        dispatch(goodsActions.getNotifications())
    }, [dispatch])

    const onStatusChange = (value: string, name: string) => {
        setFilter({...filter, [name]: value})
    }

    const hide = () => {
        setOpen(false);
      };
    
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({...filter, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e7e7e7'}}>
                <p style={{fontSize: '20px', fontWeight: 700}}>УЧЁТ ТОВАРОВ СКЛАДА</p>
                <div>
                    <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                        <img style={{marginRight: '5px'}} src='/images/calendar.png' alt='bell'/>
                        <p>Дата</p>
                     
                    </div>
                    <p>{new Date().toLocaleDateString()} </p>
                </div>
                <Popover
                    content={
                        <Table  
                            style={{fontSize: '12px'}} 
                            columns={notificationColumns} 
                            pagination={false} 
                            dataSource={notificationList}
                            rowClassName={'antd-row'}
                            onRow={(record, rowIndex) => {
                                return {
                                  onClick: event => navigate(`/dashboard/new-journal/${record.id}`), 
                                };
                              }}
                        />}
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>  
                        <p style={{marginRight: '5px'}}>Уведомления</p>
                        <img src='/images/bell.svg' alt='bell'/>       
                    </div>
                </Popover>
            </div>
            <JournalFilter
                onSearchChange={onSearchChange}
                onStatusChange={onStatusChange}
            />
            <Table 
                columns={columns} 
                dataSource={goodsList}
                summary={(pageData) => {
                    let totalSum = 0;
                    let totalCount = 0;
                    pageData.forEach(({ count, price }) => {
                        totalSum += price;
                        totalCount += count;
                    });  
                    return (
                      <>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={6} colSpan={6} ><span style={{fontWeight: 600}}>Сумма</span></Table.Summary.Cell>
                          <Table.Summary.Cell index={8}>
                        
                          {totalCount}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={7}>
                          
                          ${totalSum}
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </>
                    );
                  }}
            />
        </div>
        
    )
}

export default Journal