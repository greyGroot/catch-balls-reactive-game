import '../scss/main.scss'
// let button = document.querySelector('button');
// let text = document.querySelector('text');
import { ajax } from 'rxjs/ajax';
import { map, mapTo, mergeMap, catchError } from 'rxjs/operators';
import {fromEvent, of, merge} from 'rxjs';

export  default function gitUsers() {
    let refreshButton = document.querySelector('.refresh');
    let refreshClickStream$ = fromEvent(refreshButton, 'click').pipe(
        map(e => e.preventDefault()),
        mapTo('https://api.github.com/users?per_page=10')
    );

    let start$ = of('https://api.github.com/users?per_page=10');

    const responseStream$ = merge(start$,refreshClickStream$).pipe(
        mergeMap(url => {
            return ajax.getJSON(url)
        })
    );

    let suggestionStream1$ = createSuggestionStream(responseStream$);
    let suggestionStream2$ = createSuggestionStream(responseStream$);
    let suggestionStream3$ = createSuggestionStream(responseStream$);

    suggestionStream1$.subscribe( user => {
        renderSuggestion(user, '.suggestion1');
    });

    suggestionStream2$.subscribe( user => {
        renderSuggestion(user, '.suggestion2');
    });

    suggestionStream3$.subscribe( user => {
        renderSuggestion(user, '.suggestion3');
    });

    function createSuggestionStream(responseStream) {
        return responseStream.pipe(
            map(listUser => listUser[Math.floor(Math.random()*listUser.length)])
        );
    }

    function renderSuggestion(userData, selector) {
        let element = document.querySelector(selector);
        let usernameEl = element.querySelector('.username');
        let imgEl = element.querySelector('img');

        usernameEl.href = userData.html_url;
        usernameEl.textContent = userData.login;

        imgEl.src = userData.avatar_url;
        imgEl.alt = userData.login;
    }
}