// este import existe solo para que tsc lo tome y lo copie a /build
import { readFileSync } from "fs";
import "./contacts.json";
// si no estuviera este import typescript no se da cuenta que lo necesitamos
// ya que para escribir o leer al archivo usamos la libreria "jsonfile"

class Contact {
  id: number = 0;
  name: string = "";
}

class ContactsCollection {
  contacts:Contact[];
  constructor(contacts:Contact[]) {
    this.contacts = contacts;
  }
  load() {
    const fs = require("fs");
    const archivo = fs.readFileSync("source/contacts.json","utf-8");
    const archivoParseado:Contact[] = JSON.parse(archivo);
    this.contacts.push(...archivoParseado);    
  }
  getAll() {
    return this.contacts;
  } 
  addOne(contact:Contact) {
    this.contacts.push(contact);
  }
  save() {
    const fs = require("fs");
    try {
      const datosJson = JSON.stringify(this.contacts,null,2);
      fs.writeFileSync("source/contacts.json",datosJson,"utf-8");
      console.log("Contactos guardados correctamente.");
    } catch(error) {
      console.error("Error al guardar los contactos: ",error);
    }
    
  }
  getOneById(id:number) {
   return this.contacts.find(contact=>contact.id===id);
  }
}

export { ContactsCollection };
