import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { NgxDropzonePreviewComponent } from '../ngx-dropzone-preview.component';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'ngx-dropzone-image-preview',
  template: `
    <img [src]="imageSrc" />
		<ng-content select="ngx-dropzone-label"></ng-content>
    <ngx-dropzone-remove-badge *ngIf="removable" (click)="_remove($event)">
    </ngx-dropzone-remove-badge>
	`,
  styleUrls: ['./ngx-dropzone-image-preview.component.scss'],
  providers: [
    {
      provide: NgxDropzonePreviewComponent,
      useExisting: NgxDropzoneImagePreviewComponent
    }
  ]
})
export class NgxDropzoneImagePreviewComponent extends NgxDropzonePreviewComponent implements OnInit {

  constructor(
    sanitizer: DomSanitizer
  ) {
    super(sanitizer);
  }

  /** The file to preview. */
  @Input()
  set file(value: File) {
    this._file = value;
    this.renderImage();
  }
  get file(): File { return this._file; }

  /** The image data source. */
  defaultImgLoading = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiByZ2IoMjQxLCAyNDIsIDI0Mykgbm9uZSByZXBlYXQgc2Nyb2xsIDAlIDAlOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjIyNHB4IiBoZWlnaHQ9IjIyNHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxNCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2U9IiM4NWEyYjYiIHN0cm9rZS1kYXNoYXJyYXk9IjIxLjk5MTE0ODU3NTEyODU1MiAyMS45OTExNDg1NzUxMjg1NTIiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGR1cj0iMS4xNjI3OTA2OTc2NzQ0MTg0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGtleVRpbWVzPSIwOzEiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjEwIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZT0iI2JiY2VkZCIgc3Ryb2tlLWRhc2hhcnJheT0iMTUuNzA3OTYzMjY3OTQ4OTY2IDE1LjcwNzk2MzI2Nzk0ODk2NiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjE1LjcwNzk2MzI2Nzk0ODk2NiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4KICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZHVyPSIxLjE2Mjc5MDY5NzY3NDQxODRzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIga2V5VGltZXM9IjA7MSIgdmFsdWVzPSIwIDUwIDUwOy0zNjAgNTAgNTAiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+CjwhLS0gW2xkaW9dIGdlbmVyYXRlZCBieSBodHRwczovL2xvYWRpbmcuaW8vIC0tPjwvc3ZnPg==';
  imageSrc: any = this.sanitizer.bypassSecurityTrustUrl(this.defaultImgLoading);

  ngOnInit() {
    this.renderImage();
  }

  private renderImage() {
    if(this._file.type=="application/pdf"){
        this.imageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAAFtklEQVR4nO2bS0wTaxiGn2lLSykorYjcilFAUOGIbhBvC2Vj2BFlRWIUNGriwniBGFe6cOGGhdGoGy8kxKgxMVFj0kRRFDVEgoCXw/GIEVqPCKUtYEtL5yyIHI2CB4bpjGWeXWc68799+k3n75d/QENDQ2P2Ikz1gKZNm0Q5gkhGEJ4UOxzFkR5WF+kBZUMUVzeVlDRFethpV+Bqh2Pm00yDJyUlAAg6HWI4DILwqNjhWBep8aOmAnMqKxF0OhDFtZGsxKgRaFu58luJEbuco0YgKCMxqgRC5CVGnUCIrMSoFAiRkxi1AiEyEqNaIMgvMeoFgrwSZ4VAkE/irBEI8kicVQJh5iXOOoEwsxJnpUCYOYmzViDMjESDHMGU4MnevdJPIoqrp3rIrK7AmeC3r8CZ6ox/7WxPFa0CJaIJlIgmUCKqExj0eHh54ADPSkt5eegQQY9H6UiTojqBf588ibe1lXAggLelhe6LF5WONCmqEjg6NMTAs2foTCb+OHcOgL779xVONTmqEuh3OhHDYcyZmcQtXozOZCLk9RIOBJSONiGqEojwzUIJUUQMhUAQEAzqna6qSmCM1QrASG8vQa8XcXQUQ3w8gl6vcLKJUZVAo82G3mwmODCAr7UVgNiMDIVTTY6qBCIIWHJzAXDduAGAJStLyUS/RF0CgbmFhQD42toAsOTlKRnnl6hOYGJR0XevvwpVK6oTaMnJITY9HYDYtDRMKSkKJ5oc1QkEiF+2DABzZqbCSX6N6gSK4TCe5mYABpqbGenrUzjR5KhOoLelhaDbDYAYCuG6dk3hRJOjOoF99+4BYFu7FgSBf27eJNjfr3CqiVGVwHAgQH9jIwD2qipsa9YQDgTovnxZ4WQToyqBnx0OQoODxC9ditlux15ZiWAw8OnWLYY6O5WO91PUI1AUx3/vUsvKgLG7cEpZGWI4zLva2rHmgspQjUD306d8+fAB04IF2DZsGN+eUVGBKSWFwTdvVHkpq0ag6+pVAFLKyr7rvujj4siuqUHQ6XDW149PcdSCKhptQ52deFtb0VssJG/e/MP+hPx80isq6L50iT+PHcO+YwdiMMjoly+ER0bQGY3ozWaMSUnEZmRgyc7+vrcoI6oQ2FNXB0ByaSn6uDhCPh++jg587e0Mv3tHwOnE73IBMDo8TNepU5OeL8ZmI23rVlK3bJFdpOICfR0d9D96BEDA5eLFzp0Md3WB+ONDocakJHRGI36nE4CEggKsRUWIoRChwUFGensZ6uzE73Ty/uxZ/B8/smjfPlnzKyYwHAjQ19CAs75+fFv/w4cA6IxG4vPySCgowLJkCbHp6cSmpqIzmRBDIf46cYK+hgZ87e2Y7XYytm3DOG/e+Hk8z5/z6vBhPjsc0Scw6HbjvHqV3jt3CPl8AAh6PXNWrGDuqlUk5Odjyc1FFxPz0+MFg4Gco0ex5ObSfeECn27fpvfuXRKLirBkZxOTmMjg69cAxKamyv55IiYwHAzSU1eH6/p1wn7/d/uyqqtJ2rjx/59MEEgrL8daXEzP5cv0PXiA+/Fj3I8f//cWgwH79u0zFX9CIiLQ73TSefz42L8JQcC2bh1Db98ScLmYu2rV1OR9g9luJ/vIERbu2YOnpQV/dzdBjwfT/PnY1q8f7yvKiewCQ14vr6qrCbhcxKank11Tg6+tjf7GRgwJCSw+eFDyGDFW67S/BKnIPpHuOn2agMtFwvLlFJw5g7+nh/fnz4MgkHXoEKbkZLkjyIrsFehuGlt2vGj/fpxXrozddUWRhbt3Y12zRu7hZUd2gTFWK6NDQ7yoqgLG7riZu3aNTXKjANkv4ezq6vF1LnMKC1leW0taebncw0YM2SswfunS8ZVW0YhqujG/K5pAiWgCJaIJlIgmUCKaQIloAiWiCZSIJlAimkCJaAIlogmUiCZQItPuxkz3Ce9oQ6tADQ0NDY1p8y/GcQUNzxJXBQAAAABJRU5ErkJggg=="
    }else{
      this.readFile()
      .then(img => setTimeout(() => this.imageSrc = img))
      .catch(err => console.error(err));
    }
  }
}
