import { Component, OnInit, ɵConsole } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public  user: any = {};
  constructor(private userService: UserService, private authService: AuthorizationService , private router: Router) { }

  ngOnInit() {
    this.authService.getAccount().subscribe(
      (res) => {
        const data = res;
        this.user=data;
        // console.log(this.user);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
