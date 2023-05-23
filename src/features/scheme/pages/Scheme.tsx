import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectMap, goodsActions } from "../../journal/goodsSlice";
import { Goods } from "../../../models/goods";
import { Popover } from "antd";
import { NavLink } from "react-router-dom";

const Scheme = () => {
    const dispatch = useAppDispatch();
    const map = useAppSelector(selectMap);
    useEffect(() => {
        dispatch(goodsActions.fetchMap());
    }, [dispatch, ])

    return (
        <div>
            <div style={{fontWeight: 600, fontSize: '24px', borderBottom: '2px solid #e7e7e7', paddingBottom: '20px'}}>
                Просмотр схемы СВХ
            </div>
            <div>
                {
                Object.keys(map).map((key) => <div style={{width: '100%', margin: '30px 0'}}>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <div style={{color: '#707070', textAlign: 'center', marginBottom: '10px', borderTop: '1px solid #e7e7e7', paddingTop: '10px', width: '50%'}}>УРОВЕНЬ {key}</div>
                    </div>     
                    <div style={{marginLeft: 30, display: 'flex'}}> {new Array(30).fill('').map((item, index) => 
                        <div style={{width: '3%', margin: 3,display: 'flex', alignItems: 'center', justifyContent: 'center',}}>{index + 1}</div>)}
                    </div>
                    {Object.keys(map[key]).map(value => <div style={{display: 'flex', width: '100%'}}>
                        <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                            <div style={{width: 30, lineHeight: '20px'}}> {value}</div>   
                                {map[key][value].map((item: Goods) =>
                                item.status ? <NavLink to={`/dashboard/new-journal/${item.id}`} style={{display: 'flex', alignItems: 'center', justifyContent: 'center',height: '20px', width: '3%', margin: 3,  backgroundColor: (!item.status || item.status.toLowerCase() === "отгружен" ) ? '#D9D9D9' : item.status.toLowerCase() == 'на складе' ? '#7F8BF6' : '#F84848' }}>
                                    {item.status && 
                                        <Popover
                                            trigger={'hover'}
                                            content={<div>
                                                        <div>{item.number_dt_td_tpo}</div>
                                                        <div>
                                                            <span>Дата приёма: {new Date(item.date_of_receipt).toLocaleDateString()}</span>
                                                        </div>
                                                        <div>
                                                            <span>Товар: {item.name}</span>
                                                        </div>
                                                        <div>
                                                            <span>Страна прибытия: {item.departure_country}</span>
                                                        </div>
                                                        <div>
                                                            <span>Количество мест: {item.count} </span>
                                                        </div>
                                                    </div>
                                     }
                                    >
                                        <div style={{width: '100%', height: '100%'}}></div>
                                        </Popover>
                                 }
                                </NavLink> :
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',height: '20px', width: '3%', margin: 3,  backgroundColor: !item.status  ? '#D9D9D9' : item.status.toLowerCase() == 'на складе' ? '#7F8BF6' : '#F84848' }}></div>
                            )}
                           
                        </div>
                    </div>
                        )}
                    </div>)
                }
            </div>
       </div>
   )
}

export default Scheme