
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root',
})
export class StartScrapeService {
    constructor(
        private _httpClient: HttpClient,
        private _matSnackBar: MatSnackBar) { }

    startScrapeList(data: any): Promise<any> {
        const url = `${environment.apiUrl}startScrapeList`;
        return new Promise((resolve, reject) => {
            this._httpClient.post(url, data)
                .subscribe((response: any) => {
                    resolve(response);
                    if (response && response.status == 'OK') {
                        this._matSnackBar.open("Scraper Started!", 'OK', {
                            verticalPosition: 'top',
                            duration: 5000
                        });
                    } else {
                        this._matSnackBar.open(response.message, 'ERROR', {
                            verticalPosition: 'top',
                            duration: 5000
                        });
                    }
                }, reject);
        }
        );
    }
}