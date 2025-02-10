export interface Bot {
    name: string;
    cost: number;
    "24h": number;
    "7d": number;
    "30d": number;
    "60d": number;
    "90d": number;
    all_time: number;
}

export interface TradingData {
    trading_capital: number;
    trading_capital_currency: string;
    balance: number;
    on_hold: number;
    bots: Bot[];
}

export type Range = 'all_time' | "30d" | "7d" | "24h";