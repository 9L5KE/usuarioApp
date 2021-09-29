import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  lista_usuarios: Usuario[]
  nombre_tmp : any
  usuarioSeleccionado: Usuario
  constructor(private ngbModal: NgbModal,private usuarioService: UsuarioService) {
    this.inicializarVariables();
   }

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe(usuarios => { this.lista_usuarios= usuarios})
  }
  inicializarVariables()
  {
    this.lista_usuarios=[];
  }
  eliminarUsuario(usuario_id: any)
  {
    this.usuarioService.eliminarUsuario(usuario_id)
  }
  confirmarEliminacion(modalConfirmarBorrar, usuario) {
    this.nombre_tmp=usuario.nombres.toUpperCase()
    this.ngbModal
      .open(modalConfirmarBorrar, {
        centered: true,
        size: 'lg',
        scrollable: true,
        backdrop: 'static',
      })
      .result.then((result) => {
        if (result == 'SI') {
          this.eliminarUsuario(usuario.usuario_id)
        }
      },
      (reason) => {}
      );
  }
  abrirModalEditarUsuario(modalEditaUsuario, usuario)
  {
    this.usuarioSeleccionado=this.clonarObjeto(usuario);
    this.nombre_tmp=usuario.nombres.toUpperCase()
    this.ngbModal
      .open(modalEditaUsuario, {
        centered: true,
        size: 'lg',
        scrollable: true,
        backdrop: 'static',
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );

  }
  abrirModalVerRoles(modalVerRoles, usuario)
  {
    this.usuarioSeleccionado=this.clonarObjeto(usuario);
    //this.nombre_tmp=usuario.nombres.toUpperCase()
    this.ngbModal
      .open(modalVerRoles, {
        centered: true,
        size: 'lg',
        scrollable: true,
        backdrop: 'static',
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );

  }
  clonarObjeto(objeto: any) {
    return JSON.parse(JSON.stringify(objeto));
  }
  

}
