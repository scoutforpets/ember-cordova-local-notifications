import Ember from 'ember';

const { RSVP, Service, isEmpty } = Ember;
const { Promise } = RSVP;

export default Service.extend({
    _plugin: null,
    defaults: null,

    init() {
        this._super();

        document.addEventListener('deviceready', () => {
            this._plugin = window.cordova.plugins.notification.local;

            // set defaults
            if (!isEmpty(this.get('defaults'))) {
                this._plugin.setDefaults(this.get('defaults'));
            }
            
        }, false);
    },


    schedule(notifications) {
        if (!isEmpty(notifications)) {
            this._plugin.schedule(notifications);
        }
        else {
            this._error('schedule fucked');
        }
    },

    getScheduled() {
        return new Promise((resolve, reject) => {
            this._plugin.getScheduledIds((ids) => resolve(ids));
        });
    },

    update(id, options) {
        if (id && !isEmpty(options)) {
            this._plugin.update(options);
        }
        else {
            this._error('schedule fucked');
        }
    },

    cancel(id) {
        return new Promise((resolve, reject) => {
            if (!id) { reject(); }
            this._plugin.cancel(id, () => resolve());
        })
    },

    cancelAll() {
        return new Promise((resolve, reject) => {
            this._plugin.cancelAll(() => resolve());
        })
    },

    clear(ids) {
        if (!ids) { reject(); }

        return new Promise((resolve, reject) => {
            this._plugin.clear(ids, () => resolve());
        })
    },

    clearAll() {
        return new Promise((resolve, reject) => {
            this._plugin.clearAll(() => resolve());
        })
    },

    _error(err) {
        console.warn(err);
    }

});
