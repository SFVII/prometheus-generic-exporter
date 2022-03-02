/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/
import client, {Counter, Gauge, Histogram, Registry} from "prom-client";

export type IType = 'gauge' | 'histogram' | 'counter';
const DefaultBuckets = [0.001, 0.01, 0.1, 1, 2, 5]

interface IMetric {
    [key: string]: { instance: Gauge<any> | Histogram<any> | Counter<any> | null, type: IType }
}

interface ILabels {
    [key: string]: string[];
}


interface MetricModel {
    value: number;

    [key: string]: any;

}

interface MetricsSettings {
    type: IType,
    MetricName: string,
    MetricHelp: string,
    labelNames: string[],
    buckets?: number[],
    collect: (...args: any) => any;
    collectArgs?: any
}

export class PrometheusService {
    private readonly AppName: string;
    private Metrics: IMetric = {};
    private availableMetrics: string[] = [];
    private Labels: ILabels = {};
    private readonly register: Registry;

    constructor(AppName: string, MetricsListSettings: MetricsSettings[], defaultMetric: boolean = false) {
        this.register = new Registry();
        this.AppName = AppName;
        MetricsListSettings = this.prepareConfig(MetricsListSettings)
        if (defaultMetric)
            client.collectDefaultMetrics({register: this.register, prefix: `${AppName.toLowerCase()}_`});
        for (const {type, MetricName, MetricHelp, labelNames, buckets, collect, collectArgs} of MetricsListSettings) {
            if (labelNames) this.Labels[MetricName] = labelNames;
            this.Metrics[MetricName] = {
                type,
                instance: (
                    type === 'gauge' ? new Gauge<any>({
                        name: MetricName,
                        help: MetricHelp,
                        labelNames,
                        collect: async () => await this.SetMetric(MetricName, collect, collectArgs)
                    }) : (
                        type === 'histogram' ? new Histogram<any>({
                            name: MetricName,
                            help: MetricHelp,
                            buckets: buckets ? buckets : DefaultBuckets
                        }) : (
                            type === 'counter' ? new Counter<any>({
                                name: MetricName,
                                help: MetricHelp,
                            }) : null)
                    )
                )
            }
            if (this.Metrics[MetricName].instance) {
                this.availableMetrics.push(MetricName);
                // @ts-ignore
                this.register.registerMetric(this.Metrics[MetricName].instance)
            }
        }
    }

    public async SetMetric(name: string, MetricFunction: (...args: any) => Promise<MetricModel>, ...args: any) {
        if (this.availableMetrics.indexOf(name) > -1) {
            const data: any | void = await MetricFunction(args)
            if (data) {
                switch (this.Metrics[name].type) {
                    case 'gauge':
                        this.Gauge(name, data);
                        break;
                    case 'histogram':
                        break;
                    case 'counter':
                        break;
                }
            }
        }
    }

    async get() {
        return {
            'Content-Type': this.register.contentType,
            payload: (await this.register.metrics())
        }
    }

    private prepareConfig(MetricsListSettings: MetricsSettings[]) {
        return MetricsListSettings.map((settings: MetricsSettings) => {
            return {
                ...settings,
                MetricName: `${this.AppName.toLowerCase()}_${settings.MetricName}`,
            }
        })
    }

    private buildLabel(name: string, data: MetricModel) {
        const labels: any = {};
        if (this.Labels[name]) {
            const exist = Object.keys(data);
            for (const key of exist) {
                if (this.Labels[name].indexOf(key) > -1) labels[key] = data[key];
            }
            return labels
        } else {
            return null;
        }
    }

    private Gauge(name: string, data: MetricModel | MetricModel[]) {
        if (Array.isArray(data)) {
            for (const elem of data) this.Gauge(name, elem);
        } else {
            const labels = this.buildLabel(name, data);
            if (labels) (this.Metrics[name].instance as Gauge<any>).labels(labels).set(data.value)
            else (this.Metrics[name].instance as Gauge<any>).set(data.value)
        }

    }

    private Histogram(  data: MetricModel) {
        // @todo Histogram
    }

    private Counter(data: MetricModel) {
        // @todo Counter
    }
}
