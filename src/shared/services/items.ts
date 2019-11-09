import React from 'react';
import { Observable, from } from 'rxjs';
import rp, { RequestPromiseOptions } from 'request-promise';

import { Item, PagedResult } from '../models';
import config from '../../config.json';

/**
 * Offers the 'catalog' of items available for purchase
 */
export interface IItemsService {
    getItems: (offset?: number, limit?: number) => Observable<PagedResult<Item>>;
}

export class ItemsService implements IItemsService {
    public getItems = (offset = 0, limit = 10) => {
        const options: RequestPromiseOptions = {
            baseUrl: config.api.base,
            json: true,
        };

        return from(rp.get('/items', options));
    }
}

export const ItemsServiceContext = React.createContext(new ItemsService());
