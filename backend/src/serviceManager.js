import fs from 'fs';
import servicesRouter from './routes/service.js';
import automationsRouter from './routes/automations.js';

import { db } from './global.js';

class ServiceManager {
    constructor(app) {
        this.app = app;

        this.app.use('/service', servicesRouter);
        this.app.use('/automations', automationsRouter);

        this.services = [];
        this.importServices();

        // this.intervalId = setInterval(() => this.checkTriggers(), 10000);
    }

    async importServices() {
        const files = fs.readdirSync('src/services');
        files.forEach(async element => {
            if (element.startsWith('_'))
                return;
            console.log(`Loading file ${element}...`);
            const service = await import(`./services/${element}`);
            this.registerService(service);
        });
    }

    registerService(service) {
        this.services.push(service);
        this.app.use(`/service/oauth/${service.id}`, service.router);
    }

    getServices() {
        return this.services;
    }

    getService(id) {
        return this.services.find((service) => service.id === id);
    }

    getTrigger(serviceId, id) {
        return this.getService(serviceId).triggers.find((trigger) => trigger.id === id);
    }

    getReaction(serviceId, id) {
        return this.getService(serviceId).reactions.find((reaction) => reaction.id === id);
    }

    async checkTriggers() {
        try {
            const users = await db.getAllUsers();
            users.forEach(async (user) => {
                const automations = await db.getAutomations(user.id);
                automations.forEach(async (automation) => {
                    const triggerServiceToken = (await db.getServiceOauth(user.id, automation.trigger_service_id))[0].token;
                    const triggerServiceData = await this.getTrigger(automation.trigger_service_id, automation.trigger_id).check(automation.id, user, JSON.parse(automation.trigger_params), JSON.parse(automation.trigger_check_data), triggerServiceToken);
                    if (triggerServiceData) {
                        const reactionServiceToken = (await db.getServiceOauth(user.id, automation.reaction_service_id))[0].token;
                        await this.getReaction(automation.reaction_service_id, automation.reaction_id).execute(user, JSON.parse(automation.reaction_params), reactionServiceToken, triggerServiceData);
                    }
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default ServiceManager;
