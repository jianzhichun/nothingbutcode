import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'github-oauth',
    template: '',
    styleUrls: []
})
export class GithubOauthComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params =>
            window.opener.postMessage({
                type: "github-oauth",
                code: params['code']
            }, window.opener.location.origin)
        );
    }
}