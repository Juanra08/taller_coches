<script>
	//base de datos
	import { db } from "./firebase";
	import {
		collection,
		getDocs,
		doc,
		addDoc,
		updateDoc,
		deleteDoc,
	} from "firebase/firestore";

	let trabajo = {
		nombre: "",
		descripcion: "",
		vehiculo:""
	};

	let trabajos = [];
	
	let coche ={
		marca:"",
		modelo:"",
		año:""
	}

	let coches = [];

	// Cargamos datos de bd
	const loadDataTrabajos = async () => {
		const querySnapshot = await getDocs(collection(db, "trabajos"));
		let docs = [];
		querySnapshot.forEach((doc) => {
			docs.push({ ...doc.data(), id: doc.id });
		});
		trabajos = [...docs];
		console.log(trabajos);
	};
	const loadDataCoches = async () => {
		const querySnapshot = await getDocs(collection(db, "coches"));
		let docs = [];
		querySnapshot.forEach((doc) => {
			docs.push({ ...doc.data(), id: doc.id });
		});
		coches = [...docs];
		console.log(trabajos);
	};
	loadDataTrabajos();
	loadDataCoches();

</script>

<main>

	<!--Formulario trabajos-->



	<!---->

	<!--Formulario coches-->

	<h3>Añadir trabajos</h3>
	<div class="container flex justify-center mx-auto">

	<div id="form" >
		<form class="w-full max-w-sm">
			<!-- bind:value=variable cada cambio del input se sincorniza con la variable previamente declarada en el código -->
			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="nombre">Trabajos</label>
				</div>

				<div class="md:w-2/3">
					<input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						bind:value={trabajo.nombre}
						id="nombre"
						type="text"
						placeholder="Nombre del producto"
						required
					/>
				</div>
			</div>

			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="descripcion">Descripción</label>
				</div>

				<div class="md:w-2/3">
					<textarea class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						bind:value={trabajo.descripcion}
						id="descripcion"
						rows="3"
						placeholder="Descripción del producto"
						required
					/>
				</div>
			</div>
			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="select">Selecciona el coche</label>
				</div>
				<div class="md:w-1/3">
					<select bind:value={trabajo.id_coche} id="vehiculo" required>

					</select>
				</div>
			</div>
			<div class="md:flex md:items-center">
				<div class="md:w-1/3"></div>
				<div class="md:w-2/3">
					<button class="shadow bg-green-500 hover:bg-green-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" on:click={mostrarFormulario}>Añadir coche</button>
				</div>
			</div>
			<div class="md:flex md:items-center">
				<div class="md:w-1/3"></div>
				<div class="md:w-2/3">
						<button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Editar</button>
						<button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Añadir</button>

					
				</div>
			</div>

		</form>
	</div>
	</div>

	<!---->


</main>

