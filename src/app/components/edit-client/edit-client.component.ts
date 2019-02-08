import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../services/client.service";
import { Client } from "../../models/Client";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { SettingsService } from "../../services/settings.service";


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
      firstName:'',
      lastName:'',
      email:'',
      phone: '',
      balance: 0

  }

// disableBalanceOnEdit: boolean = false;
  disableBalanceOnEdit: boolean = this.settingsService.getSettings().disableBalanceOnEdit;
  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    //Get id from url
    this.id = this.route.snapshot.params['id'];
    //Get client
    this.clientService.getClient(this.id).subscribe( client => {
      this.client = client;
      console.log(client);
    });

    // // Get id from url
    // this.id = this.route.snapshot.params['id'];
    // // Get client
    // this.clientService.getClient(this.id).subscribe(client => this.client = client);
  }


  onSubmit({value, valid}:{value: Client, valid: boolean}){
      if (!valid) {
        this.flashMessage.show('Please fill out the form correctly!', {
          cssClass: 'alert-danger', timeout: 4000
        });
      }else{
        //Add id to client
        value.id = this.id;
        //Update the client
        this.clientService.updateClient(value);
        //Adding the message
        this.flashMessage.show('Client updated successfully!', {
          cssClass: 'alert-success', timeout: 4000
        });
        //these 2 methods works the same
        // this.router.navigate(['/client/'+this.id]);
        this.router.navigate([`/client/${this.id}`]);
      }
  }
}
