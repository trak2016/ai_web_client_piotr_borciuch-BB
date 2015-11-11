/// <reference path="../../../typings/tsd.d.ts" />
import 'zone.js';
import 'reflect-metadata';
import {Response} from 'angular2/http';
/**
 * Created by test on 2015-11-11.
 */
export interface ResponseHandler{

    handleResponse(response: Response);
}