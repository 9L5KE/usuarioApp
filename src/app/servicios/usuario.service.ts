import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 coleccion_usuarios: string = 'usuarios'
 coleccion_roles: string='roles'

  constructor(private afs: AngularFirestore) { }
  listarUsuarios()
  {
    return this.afs.collection(this.coleccion_usuarios).valueChanges();
  }
  eliminarUsuario(usuario_id) {
    //alert(usuario_id)
    return this.afs.doc(this.coleccion_usuarios + '/' + usuario_id).delete();
  }
  editarUsuario(usuario: Usuario) {
    return this.afs
      .doc(this.coleccion_usuarios + '/' + usuario.usuario_id)
      .update(usuario);
  }
  listarRoles() {
    return this.afs.collection(this.coleccion_roles).valueChanges();
  }
}

