const {PrometheusService} = require('./lib');
const {MemoryModel, DiskModel, CpuModel} = require('./lib/library');
const service = new PrometheusService('mac_os', [MemoryModel(), CpuModel(), DiskModel()]);


(async () => {
    const metrics = await service.get()
    console.log(metrics?.payload)
})();
