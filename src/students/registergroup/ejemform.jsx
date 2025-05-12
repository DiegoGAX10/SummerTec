export default function Form() {



    function signUp(formData) {
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
            description: formData.get("description"),
            status: formData.get("status"), // Radio button (single value)
            diet: formData.getAll("diet"),
            favColor:formData.get("favcolor") // Checkboxes (array of values)
        };
        console.log(JSON.stringify(data, null, 2)); // Pretty-print JSON in console
    }

    return (
        <section>
            <h1>Signup form</h1>
            <form action={signUp}>

                <label htmlFor="email">Email:</label>
                <input id="email" defaultValue="joe@schmoe.com" type="email" name="email" placeholder="joe@schmoe.com" />

                <label htmlFor="password">Password:</label>
                <input id="password" defaultValue="password123" type="password" name="password" />

                <label htmlFor="description" >Description</label>
                <textarea id="description" name="description" defaultValue="Short description">
        </textarea>



                <fieldset>

                    <legend>Employment status:</legend>
                    <label>
                        <input type="radio" name="status" defaultChecked={true} value="unemployed"/>
                        Unemployed
                    </label>


                    <label>
                        <input type="radio" name="status" value="part-time" />
                        Part time
                    </label>


                    <label>
                        <input type="radio" name="status" value="full-time"/>
                        Full time
                    </label>

                </fieldset>


                <fieldset >
                    <legend>Dietary restrictions:</legend>

                    <label>
                        <input type="checkbox" name="diet" value="vegetarian" />
                        Vegetarian
                    </label>

                    <label>
                        <input type="checkbox" name="diet" value="vegan" />
                        Vegan
                    </label>

                    <label>
                        <input type="checkbox" name="diet" value="gluten-free" />
                        Gluten-Free
                    </label>

                    <label>
                        <input type="checkbox" name="diet" value="dairy-free" />
                        Dairy-Free
                    </label>

                    <label>
                        <input type="checkbox" name="diet" value="nut-allergy" />
                        Nut Allergy
                    </label>
                </fieldset>



                <label htmlFor="favcolor">Choose your favorite color:</label>
                <select id="favcolor" name="favcolor" defaultValue="" required>
                    <option value="" disabled>Choose a color</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                </select>
                <button>Submit</button>

            </form>
        </section>
    )

}