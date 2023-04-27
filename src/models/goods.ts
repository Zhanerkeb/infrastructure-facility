export interface Goods {
    id: number | string;
    reg_number_vh: string
    status: string
    number_td_mdp: string
    number_dt_td_tpo: string
    date_of_receipt: Date
    upload_date: Date
    code_too: string
    departure_country: string
    carrier_country: string
    reciver: string
    carrier_name: string
    bin: string
    number_of_transportation: string
    name: string
    count: number
    gross_weight: number
    net_weight: number
    price: number
    documents: string
    place: string
}