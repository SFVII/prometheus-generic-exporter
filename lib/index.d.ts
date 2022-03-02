export * from "./library";
export declare type IType = 'gauge' | 'histogram' | 'counter';
interface MetricModel {
    value: number;
    [key: string]: any;
}
interface MetricsSettings {
    type: IType;
    MetricName: string;
    MetricHelp: string;
    labelNames: string[];
    buckets?: number[];
    collect: (...args: any) => any;
    collectArgs?: any;
}
export declare class PrometheusService {
    private readonly AppName;
    private Metrics;
    private availableMetrics;
    private Labels;
    private readonly register;
    constructor(AppName: string, MetricsListSettings: MetricsSettings[], defaultMetric?: boolean);
    SetMetric(name: string, MetricFunction: (...args: any) => Promise<MetricModel>, ...args: any): Promise<void>;
    get(): Promise<{
        'Content-Type': string;
        payload: string;
    }>;
    private prepareConfig;
    private buildLabel;
    private Gauge;
    private Histogram;
    private Counter;
}
export default PrometheusService;
