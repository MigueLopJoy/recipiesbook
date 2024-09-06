import { Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';
import { StorageReference } from 'firebase/storage';
import { Recipe } from '../../model/recipes/recipe';
import { RecipiesService } from '../recipies/recipies.service';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
    private recipesService: RecipiesService,
    private authService: AuthService
  ) { }

  createImageRef(folder: string, fileName: string): StorageReference {
    return ref(this.storage, `${folder}/${Date.now()}_${fileName}`);
  }

  async uploadRecipieImage(file: File, folder: string): Promise<string> {
    try {
      const imageRef: StorageReference = this.createImageRef(folder, file.name);
      
      await uploadBytes(imageRef, file);
      
      return await this.getURL(imageRef);
    
    } catch (error: unknown) {
      throw error;
    }
  }

  async getURL(ref: StorageReference): Promise<string> {
    try {
      return await getDownloadURL(ref);
    } catch(error: unknown) {
      return `https://firebasestorage.googleapis.com/b/bucket/o/default.jpg`; 
    }
  }


  // async fetchAndAddRecipies(uid:string) {
  //   const imageNames: string[] = [
  //     'borscht.jpg', 'carbonara.jpg', 'ceviche-pescado.jpg', 'churros-chocolate.jpg',
  //     'curry-pollo.jpg', 'empanadas-carne.jpg', 'ensalada-cesar.jpg', 'falafel.jpg',
  //     'hamburguesa-clásica.jpg', 'pad-thai.jpg', 'paella-valenciana.jpg', 'pizza-margarita.jpg',
  //     'ramen-pollo.jpg', 'sushi-salmon.jpg', 'tacos-carne.jpg'
  //   ];

  //   const recipies: Recipe[] = [
  //     {
  //       title: "Borscht",
  //       description: "Una sopa tradicional de Europa del Este hecha de remolacha, con un sabor dulce y agrio, generalmente servida caliente con una cucharada de crema agria.",
  //       category: "Plato principal",
  //       ingredients: ["Remolacha", "Patata", "Zanahoria", "Cebolla", "Ajo", "Caldo de verduras", "Crema agria", "Sal", "Pimienta"],
  //       steps: [
  //         "Pelar y cortar la remolacha, las patatas, zanahorias, y cebolla.",
  //         "Saltear la cebolla y el ajo hasta que estén dorados.",
  //         "Añadir las verduras cortadas al caldo de verduras y cocinar hasta que estén tiernas.",
  //         "Sazonar con sal y pimienta al gusto, y servir con crema agria."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Carbonara",
  //       description: "Clásica pasta italiana con salsa de huevo, queso parmesano, panceta y pimienta negra, ideal para un almuerzo rápido y delicioso.",
  //       category: "Plato principal",
  //       ingredients: ["Pasta (espagueti)", "Huevos", "Queso parmesano", "Panceta", "Pimienta negra", "Sal"],
  //       steps: [
  //         "Cocer la pasta en agua con sal hasta que esté al dente.",
  //         "Freír la panceta en una sartén hasta que esté crujiente.",
  //         "Batir los huevos y mezclar con queso parmesano rallado y pimienta.",
  //         "Combinar la pasta caliente con la mezcla de huevo y panceta, removiendo rápidamente.",
  //         "Servir inmediatamente."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Ceviche de Pescado",
  //       description: "Un plato refrescante de pescado crudo marinado en jugo de limón con cilantro, cebolla y ají, típico de la cocina peruana.",
  //       category: "Entrante",
  //       ingredients: ["Pescado blanco (merluza, corvina)", "Jugo de limón", "Cebolla roja", "Cilantro", "Ají limo", "Sal", "Pimienta"],
  //       steps: [
  //         "Cortar el pescado en cubos pequeños y colocarlo en un bol.",
  //         "Añadir el jugo de limón, la cebolla finamente picada, cilantro, y ají limo.",
  //         "Sazonar con sal y pimienta al gusto y dejar marinar durante 10-15 minutos.",
  //         "Servir frío acompañado de maíz o batata cocida."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Churros con Chocolate",
  //       description: "Churros crujientes espolvoreados con azúcar y canela, acompañados de una deliciosa salsa de chocolate caliente.",
  //       category: "Postres y dulces",
  //       ingredients: ["Harina", "Agua", "Sal", "Aceite para freír", "Azúcar", "Canela", "Chocolate negro", "Leche"],
  //       steps: [
  //         "Hervir agua con sal y añadir la harina, removiendo hasta formar una masa.",
  //         "Colocar la masa en una churrera y freír en aceite caliente hasta que los churros estén dorados.",
  //         "Espolvorear con azúcar y canela al gusto.",
  //         "Derretir el chocolate con leche para hacer la salsa y servir caliente."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Curry de Pollo",
  //       description: "Un plato aromático y picante de pollo cocido en una salsa de curry con leche de coco y especias.",
  //       category: "Plato principal",
  //       ingredients: ["Pollo", "Cebolla", "Ajo", "Jengibre", "Tomate", "Leche de coco", "Curry en polvo", "Aceite", "Sal"],
  //       steps: [
  //         "Saltear la cebolla, el ajo y el jengibre picados en una sartén con aceite.",
  //         "Añadir el pollo troceado y dorar por todos los lados.",
  //         "Incorporar el tomate, la leche de coco y el curry en polvo, y cocinar a fuego lento.",
  //         "Sazonar con sal al gusto y servir caliente con arroz."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Empanadas de Carne",
  //       description: "Empanadas rellenas de carne sazonada con cebolla, huevo duro, aceitunas y especias, horneadas a la perfección.",
  //       category: "Acompañamientos / Guarniciones",
  //       ingredients: ["Carne de res molida", "Cebolla", "Huevo duro", "Aceitunas", "Comino", "Masa para empanadas", "Sal", "Pimienta"],
  //       steps: [
  //         "Cocinar la carne molida con cebolla picada, comino, sal y pimienta.",
  //         "Añadir huevo duro picado y aceitunas a la mezcla.",
  //         "Rellenar las masas para empanadas con la mezcla y cerrar bien.",
  //         "Hornear a 180°C hasta que estén doradas."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Ensalada César",
  //       description: "Una ensalada fresca con lechuga romana, crutones, queso parmesano y aderezo César.",
  //       category: "Entrante",
  //       ingredients: ["Lechuga romana", "Crutones", "Queso parmesano", "Aderezo César", "Pechuga de pollo (opcional)"],
  //       steps: [
  //         "Lavar y cortar la lechuga romana.",
  //         "Añadir crutones y queso parmesano rallado.",
  //         "Aderezar con salsa César y mezclar bien.",
  //         "Agregar pechuga de pollo a la parrilla si se desea."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Falafel",
  //       description: "Croquetas de garbanzo sazonadas con hierbas y especias, fritas hasta quedar crujientes.",
  //       category: "Snack",
  //       ingredients: ["Garbanzos", "Cebolla", "Ajo", "Cilantro", "Perejil", "Comino", "Cilantro molido", "Harina", "Aceite para freír"],
  //       steps: [
  //         "Remojar los garbanzos durante la noche y triturarlos con cebolla, ajo, cilantro y perejil.",
  //         "Añadir especias y harina para formar una masa.",
  //         "Formar bolitas o discos y freír en aceite caliente hasta que estén dorados.",
  //         "Servir con salsa de yogur o tahini."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Hamburguesa Clásica",
  //       description: "Una jugosa hamburguesa de carne de res con queso, lechuga, tomate, cebolla y salsa al gusto.",
  //       category: "Plato principal",
  //       ingredients: ["Carne de res molida", "Queso cheddar", "Lechuga", "Tomate", "Cebolla", "Pan de hamburguesa", "Salsa al gusto"],
  //       steps: [
  //         "Formar las hamburguesas con la carne molida y sazonar con sal y pimienta.",
  //         "Cocinar a la parrilla o en sartén hasta el punto deseado.",
  //         "Montar la hamburguesa con queso, lechuga, tomate, cebolla y la salsa elegida.",
  //         "Servir con papas fritas."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Pad Thai",
  //       description: "Un plato tailandés clásico de fideos de arroz salteados con camarones, tofu, huevo, brotes de soja y salsa de tamarindo.",
  //       category: "Plato principal",
  //       ingredients: ["Fideos de arroz", "Camarones", "Tofu", "Huevo", "Brotes de soja", "Cebollín", "Salsa de tamarindo", "Cacahuetes", "Limón"],
  //       steps: [
  //         "Cocer los fideos de arroz según las instrucciones del paquete.",
  //         "Saltear los camarones y el tofu con huevo en un wok.",
  //         "Añadir los fideos cocidos, la salsa de tamarindo y mezclar bien.",
  //         "Servir con brotes de soja, cacahuetes picados y una rodaja de limón."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Paella Valenciana",
  //       description: "Un plato tradicional español de arroz cocido con pollo, conejo, judías verdes, garrofón y azafrán.",
  //       category: "Plato principal",
  //       ingredients: ["Arroz", "Pollo", "Conejo", "Judías verdes", "Garrofón", "Tomate", "Pimiento", "Azafrán", "Aceite de oliva"],
  //       steps: [
  //         "Dorar el pollo y el conejo en una paellera con aceite de oliva.",
  //         "Añadir las judías verdes, garrofón y tomate, y cocinar unos minutos.",
  //         "Incorporar el arroz y el azafrán, y cubrir con caldo.",
  //         "Cocinar a fuego medio hasta que el arroz esté en su punto.",
  //         "Dejar reposar unos minutos antes de servir."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Pizza Margarita",
  //       description: "Una pizza clásica italiana con salsa de tomate, mozzarella fresca, albahaca y aceite de oliva.",
  //       category: "Plato principal",
  //       ingredients: ["Masa para pizza", "Salsa de tomate", "Mozzarella fresca", "Albahaca", "Aceite de oliva", "Sal"],
  //       steps: [
  //         "Precalentar el horno a 250°C.",
  //         "Extender la masa para pizza y cubrir con salsa de tomate.",
  //         "Añadir la mozzarella fresca en rodajas y hojas de albahaca.",
  //         "Hornear durante 10-15 minutos o hasta que la masa esté crujiente.",
  //         "Rociar con aceite de oliva antes de servir."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Ramen de Pollo",
  //       description: "Un caldo japonés reconfortante con pollo, fideos ramen, huevo, algas y cebolletas.",
  //       category: "Plato principal",
  //       ingredients: ["Fideos ramen", "Caldo de pollo", "Pechuga de pollo", "Huevo", "Algas", "Cebolletas", "Salsa de soja", "Aceite de sésamo"],
  //       steps: [
  //         "Cocer la pechuga de pollo en caldo de pollo hasta que esté cocida.",
  //         "Hervir los fideos ramen en el mismo caldo.",
  //         "Cortar el pollo en tiras y añadirlo a los fideos con huevo cocido, algas y cebolletas.",
  //         "Sazonar con salsa de soja y aceite de sésamo antes de servir."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Sushi de Salmón",
  //       description: "Rollos de sushi rellenos de arroz sazonado, salmón fresco y aguacate.",
  //       category: "Entrante",
  //       ingredients: ["Arroz para sushi", "Vinagre de arroz", "Salmón fresco", "Aguacate", "Alga nori", "Salsa de soja", "Wasabi"],
  //       steps: [
  //         "Preparar el arroz para sushi según las instrucciones del paquete.",
  //         "Colocar una lámina de alga nori sobre una esterilla de bambú y añadir el arroz sazonado.",
  //         "Colocar tiras de salmón y aguacate en el centro, y enrollar firmemente.",
  //         "Cortar en piezas y servir con salsa de soja y wasabi."
  //       ],
  //       images: [],
  //       authorId: ''
  //     },
  //     {
  //       title: "Tacos de Carne",
  //       description: "Tacos mexicanos con carne sazonada, cebolla, cilantro, y salsa al gusto.",
  //       category: "Plato principal",
  //       ingredients: ["Tortillas de maíz", "Carne de res", "Cebolla", "Cilantro", "Lima", "Salsa roja", "Sal"],
  //       steps: [
  //         "Cocinar la carne de res con sal y sazonar al gusto.",
  //         "Calentar las tortillas de maíz en una sartén.",
  //         "Rellenar las tortillas con la carne, cebolla picada y cilantro.",
  //         "Añadir salsa y una rodaja de lima antes de servir."
  //       ],
  //       images: [],
  //       authorId: ''
  //     }
  //   ];

  //   this.authService.getUserId().subscribe({
  //     next: async (authorId: string | null) => {
  //       if (authorId) {
  //         for (let i = 0; i < recipies.length; i++) {
  //           const downloadURL = await this.getURL(ref(this.storage, `recipies/${imageNames[i]}`)),
  //             recipie: Recipe = {
  //             title: recipies[i].title,
  //             description: recipies[i].description,
  //             category: recipies[i].category,
  //             ingredients: recipies[i].ingredients,
  //             steps: recipies[i].steps,
  //             images: [downloadURL],
  //             authorId
  //           };
      
  //           this.recipesService.addRecipie(recipie);
  //         }
  //       }
  //     }
  //   })
    
  // }


}
