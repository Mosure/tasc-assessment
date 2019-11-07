import React from 'react';
import { Item } from '../models';
import { PagedResult } from '../models/paged-result';

/**
 * Offers the 'catalog' of items available for purchase
 */
export interface IItemsService {
    getItems: (offset?: number, limit?: number) => PagedResult<Item>;
}

/**
 * Note: the local service is used for development and testing only
 */
export class LocalItemsService implements IItemsService {
    protected _items: Item[] = [
        {
            id: '0',
            name: '16lb bag of Skittles',
            price: 16.00,
            taxable: false,
            imported: false,
        },
        {
            id: '1',
            name: 'Walkman',
            price: 99.99,
            taxable: true,
            imported: false,
        },
        {
            id: '2',
            name: 'Bag of microwave Popcorn',
            price: 0.99,
            taxable: false,
            imported: false,
        },
        {
            id: '3',
            name: 'Bag of Vanilla-Hazelnut Coffee',
            price: 11.00,
            taxable: false,
            imported: true,
        },
        {
            id: '4',
            name: 'Vespa',
            price: 15001.25,
            taxable: true,
            imported: true,
        },
        {
            id: '5',
            name: 'Crate of Almond Snickers',
            price: 75.99,
            taxable: false,
            imported: true,
        },
        {
            id: '6',
            name: 'Discman',
            price: 55.00,
            taxable: true,
            imported: false,
        },
        {
            id: '7',
            name: 'Bottle of wine',
            price: 10.00,
            taxable: true,
            imported: true,
        },
        {
            id: '8',
            name: '300# bag of Fair-Trade Coffee',
            price: 997.99,
            taxable: false,
            imported: false,
        },
    ];

    public getItems = (offset = 0, limit = 10) => {
        const result: PagedResult<Item> = {
            data: this._items.slice(offset, offset + limit),
            offset,
            total: this._items.length,
        };

        return result;
    }
}

export const ItemsServiceContext = React.createContext(new LocalItemsService());
