"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrometheusService = void 0;
/***********************************************************
 **  @project
 **  @file
 **  @author Brice Daupiard <brice.daupiard@nowbrains.com>
 **  @Date 01/03/2022
 **  @Description
 ***********************************************************/
const prom_client_1 = __importStar(require("prom-client"));
__exportStar(require("./library"), exports);
const DefaultBuckets = [0.001, 0.01, 0.1, 1, 2, 5];
class PrometheusService {
    constructor(AppName, MetricsListSettings, defaultMetric = false) {
        this.Metrics = {};
        this.availableMetrics = [];
        this.Labels = {};
        this.register = new prom_client_1.Registry();
        this.AppName = AppName;
        MetricsListSettings = this.prepareConfig(MetricsListSettings);
        if (defaultMetric)
            prom_client_1.default.collectDefaultMetrics({ register: this.register, prefix: `${AppName.toLowerCase()}_` });
        for (const { type, MetricName, MetricHelp, labelNames, buckets, collect, collectArgs } of MetricsListSettings) {
            if (labelNames)
                this.Labels[MetricName] = labelNames;
            this.Metrics[MetricName] = {
                type,
                instance: (type === 'gauge' ? new prom_client_1.Gauge({
                    name: MetricName,
                    help: MetricHelp,
                    labelNames,
                    collect: async () => await this.SetMetric(MetricName, collect, collectArgs)
                }) : (type === 'histogram' ? new prom_client_1.Histogram({
                    name: MetricName,
                    help: MetricHelp,
                    buckets: buckets ? buckets : DefaultBuckets
                }) : (type === 'counter' ? new prom_client_1.Counter({
                    name: MetricName,
                    help: MetricHelp,
                }) : null)))
            };
            if (this.Metrics[MetricName].instance) {
                this.availableMetrics.push(MetricName);
                // @ts-ignore
                this.register.registerMetric(this.Metrics[MetricName].instance);
            }
        }
    }
    async SetMetric(name, MetricFunction, ...args) {
        if (this.availableMetrics.indexOf(name) > -1) {
            const data = await MetricFunction(args);
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
        };
    }
    prepareConfig(MetricsListSettings) {
        return MetricsListSettings.map((settings) => {
            return {
                ...settings,
                MetricName: `${this.AppName.toLowerCase()}_${settings.MetricName}`,
            };
        });
    }
    buildLabel(name, data) {
        const labels = {};
        if (this.Labels[name]) {
            const exist = Object.keys(data);
            for (const key of exist) {
                if (this.Labels[name].indexOf(key) > -1)
                    labels[key] = data[key];
            }
            return labels;
        }
        else {
            return null;
        }
    }
    Gauge(name, data) {
        if (Array.isArray(data)) {
            for (const elem of data)
                this.Gauge(name, elem);
        }
        else {
            const labels = this.buildLabel(name, data);
            if (labels)
                this.Metrics[name].instance.labels(labels).set(data.value);
            else
                this.Metrics[name].instance.set(data.value);
        }
    }
    Histogram(data) {
        // @todo Histogram
    }
    Counter(data) {
        // @todo Counter
    }
}
exports.PrometheusService = PrometheusService;
exports.default = PrometheusService;
