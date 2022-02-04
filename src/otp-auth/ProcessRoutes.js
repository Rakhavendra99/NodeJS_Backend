'use strict';

import { MediaType } from '../config/Constants';

export default (router, routes) => {

    return routes.map(route => {
        const middleWare = route.middleware || [];
        switch (route.type) {
            case MediaType.GET:
                return router.get(route.path, ...middleWare, route.method);
            case MediaType.POST:
                return router.post(route.path, ...middleWare, route.method);
            case MediaType.PUT:
                return router.put(route.path, ...middleWare, route.method);
            case MediaType.DELETE:
                return router.delete(route.path, ...middleWare, route.method);
        }
    })
}