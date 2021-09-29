import { Component, Input, OnInit } from '@angular/core';
import { Rol } from 'src/app/interfaces/rol';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-lista-roles-usuario',
  templateUrl: './lista-roles-usuario.component.html',
  styleUrls: ['./lista-roles-usuario.component.css']
})
export class ListaRolesUsuarioComponent implements OnInit {
  @Input() public usuarioSeleccionadoRoles: Usuario = {};
  roles_seleccionados: Rol[];
  constructor() { 
    
  }

  ngOnInit(): void {
    this.roles_seleccionados = this.usuarioSeleccionadoRoles.roles;
    //alert(this.usuarioSeleccionadoRoles.nombres)
  }

}
