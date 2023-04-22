import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-upload',
  templateUrl: './recipe-upload.component.html',
  styleUrls: ['./recipe-upload.component.css']
})

// Create Recipe class
export class Recipe {
  constructor(
    public name: string,
    public ingredients: string,
    public prep_time: number,
    public cook_time: number,
    public yield_amount: number,
    public yield_unit: string,
    public prep_inst: string,
    public cook_inst: string
  ) {}
}

export class RecipeUploadComponent {
  http: any;
  
  onSubmit(form: NgForm) {
    // Create a new recipe object
    const recipe = new Recipe(
      form.value.Name,
      form.value.Ingredients,
      form.value.PrepTimeMin,
      form.value.CookingTimeMin,
      form.value.Yield,
      form.value.YieldUnit,
      form.value.PrepInst,
      form.value.CookInst
    );
  
    // Send the recipe object to the server
    this.http.post('https://106bf2a5-bfea-4597-92d1-97c02590d285.mock.pstmn.io/recipes', recipe)
      .subscribe(
        (response: any) => {
          console.log('Recipe saved successfully!');
          // Reset the form after the recipe has been saved
          form.reset();
        },
        (error: any) => {
          console.log('An error occurred while saving the recipe:', error);
        }
      );
  }
}
