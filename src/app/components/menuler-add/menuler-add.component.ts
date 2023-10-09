import { Component, Inject } from '@angular/core'; //Inject
import { menulerModel } from 'src/app/models/menulerModel';
import { menuModel } from 'src/app/models/menuModel';
import { urunModel } from 'src/app/models/urunModel';
import { ServiceUrunlerService } from 'src/app/services/service-urunler.service';
import { ServiceMenuService } from 'src/app/services/service-menu.service';
import { ServiceMenulerService } from 'src/app/services/service-menuler.service';
import { forkJoin } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //MAT_DIALOG_DATA (gelen parametreyi alabilmek için)
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators'; // map operatörü

@Component({
  selector: 'app-menuler-add',
  templateUrl: './menuler-add.component.html',
  styleUrls: ['./menuler-add.component.css']
})

export class MenulerAddComponent {

  mergeForm!: FormGroup;
  currentRestiId!: number;
  actionBtn: string = "save";

  menuList: menuModel[] = [];
  urunList: urunModel[] = [];
  menulerList: menulerModel[] = [];
  mergeMenulerList: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiServiceURUN: ServiceUrunlerService,
    private apiServiceMENU: ServiceMenuService,
    private apiServiceMENULER: ServiceMenulerService,
    private dialogRef: MatDialogRef<MenulerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {  // Gelen veriyi burada alıyoruz

    this.mergeMenulerList = data.mergeMenulerList;
    this.urunList = data.urunList;
    this.menuList=data.menuList;
  }

  ngOnInit(): void {
    this.data; // diziyi çağırdım (data: this.mergeMenulerList)
    console.log('data: ', this.data)

    this.mergeForm = this.formBuilder.group({
      menulerID: null,
      menuID: null,
      menuAdi: ['', [Validators.required]],
      urunID: [],  // urunID'yi, seçilen birden çok değeri tutmak için boş bir dizi olarak ayarladım
      urunAdi: ['', [Validators.required]]
    });


  }//ngOninit end

  addMENULER() {
    const menuAdi = this.mergeForm.value.menuAdi;
    const urunIDList = this.mergeForm.value.urunID;

    const existingMenu = this.menuList.find(item => item.menuAdi === menuAdi);

    console.log("existingMenu :",existingMenu)
    console.log("menuList :",this.menuList)

    if (!existingMenu) { // Eğer menü adı daha önce kullanılmamışsa, yeni menü oluşturup menüler service'e gönder
      this.apiServiceMENU.post(menuAdi).pipe( 
        map(response => response.menuID)//Menüyü oluşturup, sadece menü ID'sini almak için map operatörünü kullan (sadece menuID özelliğini al)
      ).subscribe({
        next: (menuID) => {
          console.log("menuID: ", menuID);
          this.apiServiceMENULER.post(menuID, urunIDList).subscribe({
            next: () => this.handleSuccess(),
            error: (error) => this.handleError(error)
          });
        },
        error: (error) => this.handleError(error)
      });
    } else { // Menü adı varsa, sadece menüler service'e menü ID'sini ve ürün listesini gönder
      this.apiServiceMENULER.post(existingMenu.menuID, urunIDList).subscribe({
        next: () => this.handleSuccess(),
        error: (error) => this.handleError(error)
      });
    }
  }

  handleSuccess() {
    alert("Öğe başarıyla eklendi");
    this.mergeForm.reset();
    this.dialogRef.close('save');
    window.location.reload();
  }

  handleError(error: any) {
    console.error('Hata:', error);
    alert('Hata oluştu: ' + error.message);
  }


}


// error: (error) => {
//   if (error.status === 400) {
//     this.snackBar.open(error.error, 'Kapat', {
//       duration: 5000, // SnackBar'ın ne kadar süreyle gösterileceği (ms cinsinden)
//       panelClass: 'error-snackbar' // Opsiyonel: Kendi stilinizi uygulamak için CSS sınıfı ekleyebilirsiniz
//     });
//   }//if end
//   else {
//     this.snackBar.open('Hata oluştu: ' + error.message, 'Kapat', {
//       duration: 5000,
//       panelClass: 'error-snackbar'
//     });
//   }//else end

// }