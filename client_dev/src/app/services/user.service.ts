import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from '../models/user';
import { Global } from './global';

@Injectable()
export class UserService{
    public url:string;
    public identity;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
        this.identity="";
    }

    testService(){
        return 'Probando el servicio de Angular;'
    }

    saveUser(user:User): Observable <any>{
       
        let params = JSON.stringify(user);
        let headers= new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'save-user', params, {headers: headers});
    }

    getUsers(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.get(this.url+'users', {headers: headers});
    }

    getUser(id:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'user/'+id, {headers: headers});
    }

    deleteUser(id:any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.delete(this.url+'user/'+id, {headers: headers});
    }

    updateUser(user:any): Observable<any>{
        let params= JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'user/'+user._id, params, {headers: headers});
    }

    signup(user:User, gettoken=null): Observable<any>{

        let params= JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.post(this.url+'login', params, {headers: headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity')!);

        if(identity != "undefined"){
            this.identity= identity
        }else{
            this.identity= "error";
        }

        return this.identity;
    }
}