import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestsService } from 'src/app/service/tests.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  years: number[] = Array(71).fill(1).map((_, idx) => 2021 - idx)
  name= "";
  gender = "";
  birthday = "";
  phoneNumber= "";
  address= "";
  rate = 0;
  cities: string[] = ["Adana","Adiyaman","Afyon","Agri","Aksaray","Amasya","Ankara","Antalya","Ardahan","Artvin","Aydin","Balikesir","Bartin","Batman","Bayburt","Bilecik","Bingol","Bitlis","Bolu","Burdur","Bursa","Canakkale","Cankiri","Corum","Denizli","Diyarbakir","Duzce","Edirne","Elazig","Erzincan","Erzurum","Eskisehir","Gaziantep","Giresun","Gumushane","Hakkari","Hatay","Igdir","Isparta","Istanbul","Izmir","Kahramanmaras","Karabuk","Karaman","Kars","Kastamonu","Kayseri","Kilis","Kirikkale","Kirklareli","Kirsehir","Kocaeli","Konya","Kutahya","Malatya","Manisa","Mardin","Mersin","Mugla","Mus","Nevsehir","Nigde","Ordu","Osmaniye","Rize","Sakarya","Samsun","Sanliurfa","Siirt","Sinop","Sirnak","Sivas","Tekirdag","Tokat","Trabzon","Tunceli","Usak","Van","Yalova","Yozgat","Zonguldak"];
  currentUserName = localStorage.getItem('name') as string;
  currentUserMail = localStorage.getItem('email') as string;
  currentUserId = localStorage.getItem('id') as string;
  currentUser = new Map<string, User>();
  inputName = this.currentUser.get(this.currentUserId)?.fullname;
  inputMail = this.currentUser.get(this.currentUserId)?.email;
  inputGender = this.currentUser.get(this.currentUserId)?.gender;
  inputBirthday = this.currentUser.get(this.currentUserId)?.birthday;
  inputPhoneNumber = this.currentUser.get(this.currentUserId)?.phoneNumber;
  userRole = this.currentUser.get(this.currentUserId)?.role;
  profilePicture = localStorage.getItem('profilePicture') as string;
  control: any;
  
  date = new FormControl(new Date());

  selectedImage!: any;
  fb!: string;
  downloadURL!: Observable<string>;

  profileImage: any;

  constructor(
    public _authService: AuthService,
    public _userService: UserService,
    private _snackBar: MatSnackBar,
    public _testsService: TestsService,
    private storage: AngularFireStorage
  ) {
   
   }

  async ngOnInit() {
      this._authService.getUser(this.currentUserId).valueChanges().subscribe(xd => {
      this.currentUser.set(this.currentUserId, xd!);
      this.inputName =  Array.from(this.currentUser.values())[0].fullname;
      this.inputMail =  Array.from(this.currentUser.values())[0].email;
      this.inputGender = Array.from(this.currentUser.values())[0].gender;
      this.inputBirthday = Array.from(this.currentUser.values())[0].birthday;
      this.inputPhoneNumber = Array.from(this.currentUser.values())[0].phoneNumber;
      this.userRole = Array.from(this.currentUser.values())[0].role;

    });

    
    let count = 0;
    await this._testsService.getFinalizedTestsByDoctorId(localStorage.getItem("id")!).get().forEach(fh=>{
      fh.docs.forEach(fr=>{
        if(fr.data().rate != ""){
          count++;        
          this.rate += Number(fr.data().rate);
        }
      });
    });
    this.rate = this.rate / count;
    
    await this.storage.storage.ref(this.profilePicture).getDownloadURL().then(
      (url: string) => {
        this.profileImage = url;
      }
    )
    
  }



  saveChanges(_name: any, _gender: any, _birthday: any, _phoneNumber: any){
      
      if(_name == "") {
        _name = this.currentUser.get(this.currentUserId)?.fullname;
      }
      if(_gender == "") {
        _gender = this.currentUser.get(this.currentUserId)?.gender;
      }
      if(_birthday == "") {
        _birthday = this.currentUser.get(this.currentUserId)?.birthday;
      }
      if(_phoneNumber == "") {
        _phoneNumber = this.currentUser.get(this.currentUserId)?.phoneNumber;
      }
      localStorage.setItem('name', _name)
      
  
      this._userService.userRef.doc(this.currentUserId).update({fullname:_name, gender: _gender, birthday: _birthday, phoneNumber: _phoneNumber });
    
      this._snackBar.open("Your changes were saved" , "Continue", {
        horizontalPosition: "right",
        verticalPosition: "bottom",
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    }
     
     refresh(){
      window.location.reload();
     }

     // takes the file uploaded
    onFileSelected(event: any) {
      this.selectedImage = event.target.files[0];
      if(this.selectedImage.size > 1048576 ){
        alert("Please select an image smaller than 1MB");
     }
     else{
      this.control = "yes";
      const file = this.selectedImage;
      const name = this.selectedImage.name;
      this.storage.upload('ProfileImages/'+name, file);
      this._userService.userRef.doc(this.currentUserId).update({profilePicture: 'ProfileImages/'+name});
      localStorage.setItem('profilePicture', 'ProfileImages/'+name);
    }
    }

    // gets the url of the necessary picture
    getDownloadURL(){
      return this.profileImage;
    }
  }



