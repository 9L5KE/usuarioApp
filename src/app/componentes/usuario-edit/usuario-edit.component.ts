import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Rol } from 'src/app/interfaces/rol';
import { Usuario } from 'src/app/interfaces/usuario';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit, AfterViewInit {
  @Input() public usuarioSeleccionado: Usuario = {};
  usuario: Usuario;
  contrasena_confirmar: any;
  mensaje_contrasena: string;
  rol_seleccionado: Rol;
  roles: Rol[];
  roles_seleccionados: Rol[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.inicializarVariables(this.usuarioSeleccionado)
    this.listarRoles();
  }
  ngAfterViewInit() {
    //valor que llega de @Input() nombre
    //this.usuario = this.usuarioRecibido;
    this.contrasena_confirmar=this.usuarioSeleccionado.contrasena;
   // alert(this.usuario.nombres)
  }
  passwordDif(): boolean {
    return this.usuario.contrasena != this.contrasena_confirmar ? true : false;
  }
  addRol() {
    if (this.existeRol()) {
      console.log('el rol ya fue seleccionado');
    } else {
      //añadir Rol
      this.roles_seleccionados.push(this.rol_seleccionado);
    }
  }

  existeRol(): boolean {
    let existe_rol = this.roles_seleccionados.find(
      (rol) => rol.rol_id == this.rol_seleccionado.rol_id
    );

    if (existe_rol) {
      return true;
    } else {
      return false;
    }
  }
  limpiarCampos() {}
  listarRoles() {
    this.usuarioService.listarRoles().subscribe((roles) => {
      console.log('roles:', roles);
      this.roles = roles;
    });
  }

  quitarRol(indice) {
    // [ -
    //   indice: 0, value:'rol1',
    // -
    //   indice: 1, value:'rol2'
    // ]
    this.roles_seleccionados.splice(indice, 1);
  }
  keyPress(event) {
    if (this.passwordDif()) {
      this.mensaje_contrasena = '';
    } else {
      this.mensaje_contrasena = '*Contraseñas no coinciden';
    }
  }
  inicializarVariables(usuarioSeleccionado: Usuario) {
    this.roles = [];
    this.roles_seleccionados = this.usuarioSeleccionado.roles;
    this.rol_seleccionado = {};
    this.usuario = usuarioSeleccionado;
    this.contrasena_confirmar = {};
    this.mensaje_contrasena = '';
  }
  editarUsuario(frmRegistro: NgForm) {
    if (frmRegistro.valid) {
      if (this.roles_seleccionados.length > 0) {
        //añadir los roles seleccionados al usuario
        this.usuario.roles = this.roles_seleccionados;
        //editar al usuario
        this.usuarioService.editarUsuario(this.usuario).then(() => {
          alert('Usuario actualizado correctamente!');
        });
      } else {
        alert('Añadir almenos 1 rol!');
      }
    } else {
      alert('Formulario invalido! revise los campos obligatorios');
    }
  }

}
