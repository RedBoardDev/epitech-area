import fs from 'fs';

import { db } from './global.js';

class ServiceManager {
    constructor(app) {
        this.app = app;

        this.services = {};
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
        this.services[service.id] = service;
        this.app.use(`/service/${service.id}`, service.router);
    }

    getServices() {
        return this.services;
    }

    getService(id) {
        return this.services[id];
    }

    async checkTriggers() {
        try {
            const users = await db.getAllUsers();
            users.forEach(async (user) => {
                const automations = await db.getAutomations(user.id);
                automations.forEach(async (automation) => {
                    const triggerServiceToken = (await db.getServiceOauth(user.id, automation.trigger_service_id))[0].token;
                    const reactionServiceToken = (await db.getServiceOauth(user.id, automation.reaction_service_id))[0].token;
                    const triggerService = this.getService(automation.trigger_service_id);
                    const reactionService = this.getService(automation.reaction_service_id);
                    const triggerServiceData = await triggerService.triggers[automation.trigger_id].check(user, JSON.parse(automation.trigger_params), triggerServiceToken);
                    if (triggerServiceData) {
                        await reactionService.reactions[automation.reaction_id].execute(user, JSON.parse(automation.reaction_params), reactionServiceToken, triggerServiceData);
                    }
                });
            });
        } catch (error) {
            console.error(error);
        }
        console.log('-------------------------------------------------------------------------');
    }
}

export default ServiceManager;
