import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TerminalActivity } from '../../domains/models/terminal-activity.model';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  // Refactorizado para manejo de errores y un enfoque más reactivo
  public listenForUpdates(): Observable<TerminalActivity> {
    return this.listen<TerminalActivity>('update').pipe(
      catchError((error) => {
        // Aquí puedes manejar el error como prefieras, incluso reemitirlo o loguearlo
        console.error('Error al escuchar updates', error);
        return throwError(error); // Reemitir el error si es necesario
      })
    );
  }

  // Método genérico para escuchar cualquier evento del socket
  // Mejorado con tipado genérico para flexibilidad
  private listen<T>(eventName: string): Observable<T> {
    return this.socket.fromEvent<T>(eventName);
  }

  // Método para emitir eventos con manejo básico de errores
  public emit(eventName: string, data: any): void {
    try {
      this.socket.emit(eventName, data);
    } catch (error) {
      console.error(`Error al emitir el evento ${eventName}`, error);
      // Aquí podrías manejar el error como mejor te parezca
    }
  }
}
