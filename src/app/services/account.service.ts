import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private host = "http://paintstorerest.azurewebsites.net/";
  constructor(private _http: HttpClient) {}

  public selectUserById(id: number) {
    return this._http.get(this.host + "api/Posts/Users/" + id);
  }

  getUserToken(data: any) {
    // let data = {
    //   email: name,
    //   password: password
    // };

    return this._http.post(this.host + "api/SignIn/In", data);
  }

  registerUser(data: any) {
    // let data = {
    //   name: name,
    //   email: email,
    //   password: password
    // };
    console.log(data);
    //   let headers = new HttpHeaders();
    //  headers.append("Authorization", "Basic " + btoa("username:password"));
    return this._http.post(this.host + "api/Users/AddUser", data);
  }
}
