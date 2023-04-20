import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-upload',
  templateUrl: './recipe-upload.component.html',
  styleUrls: ['./recipe-upload.component.css']
})
export class RecipeUploadComponent {
  http: any;

  // Sample Recipe object
  Recipe: { name: string, ingredients: string, prep_time: number, cook_time: number,
            yield: number, yield_unit: string, prep_inst: string, cook_inst: string } = {
    name: "Sample Recipe Title",
    ingredients: "Sample ingredients here",
    prep_time: 20,
    cook_time: 15,
    yield: 2,
    yield_unit: "lbs",
    prep_inst: "Prep instructions here",
    cook_inst: "Cooking instructions here"
  };
  
  onSubmit(form: NgForm) {
    // Create a new recipe object
    const recipe = new this.Recipe(
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
    TODO: // complete request
    // Pretty sure API url needs to be below
    this.http.post('mongodb+srv://dmunozl:4720adminpassword@4720-cluster.cld7ug6.mongodb.net/?retryWrites=true&w=majority', recipe)
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
