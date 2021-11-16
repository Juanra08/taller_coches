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
	
	let editar = false;

	//Guardamos datos en la base de datos
	const addCoche = async () => {
		await addDoc(collection(db, "coches"), coche);
		loadDataTrabajos();
		loadDataCoches();
		vaciarForm2();
		mostrarFormulario();
	}

	//Añade un elemento a la base de datos
	const añadirElemento = async () => {
		await addDoc(collection(db, "trabajos"), trabajo);
		loadDataTrabajos();
		loadDataCoches();
	};

	//Actualiza el elemento seleccionado en la base de datos
	const guardarElemento = async () => {
		await updateDoc(doc(db, "trabajos", trabajo.id), trabajo);
		await loadDataTrabajos();
		await loadDataCoches();
		vaciarForm();
	};

	//Te permite editar un elemto y carga los datos dl elemento seleccionado en el formulario
	const editarElemento = (t) => {
		trabajo = Object.assign({}, t);
		editar = true;
	};

	//Elimina un elemento de la base de datos
	const eliminarElemento = async (id) => {
		await deleteDoc(doc(db, "trabajos", id));
		await loadDataTrabajos();
		await loadDataCoches();
	};
		
	//Datos de la base de datos
	//Carga los datos de la tabla trabajos
	const loadDataTrabajos = async () => {
		const querySnapshot = await getDocs(collection(db, "trabajos"));
		let docs = [];
		querySnapshot.forEach((doc) => {
			docs.push({ ...doc.data(), id: doc.id });
		});
		trabajos = [...docs];
		console.log(trabajos);
	};

	//Carga los datos de la tabla coches
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

	//vaciar formulario de trabajos
	const vaciarForm = () => {
		trabajo	= {
			nombre:"",
			descripcion: "",
			id_coche: ""
		}
		editar = false;
	}

	//Vacia el formulario de coches
	const vaciarForm2 = () => {
		coche	= {
			marca:"",
			modelo:"",
			año:""
		}
	}

	// Handler principal
	const onSubmitHandler = (e) => {
			if(editar){
				guardarElemento();
			}else{
				console.log("Guardando...");
				añadirElemento();
				vaciarForm();
			}
	
		
	};

	//Vuelve a mostrar el formulario de trabajos
	const cancelar = () => {
		var x = document.getElementById("formCoche");
		var y = document.getElementById("form");

		x.style.display = "none";
		y.style.display = "block";

	}

	//Al hacer clic cambia un formulario por el otro
	const mostrarFormulario = () => {
    var x = document.getElementById("formCoche");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
	var y = document.getElementById("form");
    if (y.style.display === "none") {
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
}
</script>

<main>
	<h1>Taller</h1>
	<!--tabla con todos los datos-->
	<h3>Trabajos pendientes</h3>

	<div class="container flex justify-center mx-auto">
		<div class="flex flex-col">
			<div class="w-full">
				<div class="border-b border-gray-200 shadow">
					<table class="divide-y divide-gray-300 ">
						<thead class="bg-gray-50">
							<tr>
								<th class="px-6 py-2 text-s text-gray-500">
									Trabajo
								</th>
								<th class="px-6 py-2 text-s text-gray-500">
									Descripción
								</th>
								<th class="px-6 py-2 text-s text-gray-500">
									Marca
								</th>
								<th class="px-6 py-2 text-s text-gray-500">
									Modelo
								</th>
								<th class="px-6 py-2 text-s text-gray-500">
									Año
								</th>
								<th class="px-6 py-2 text-s text-gray-500">
									Edit
								</th>
								<th class="px-6 py-2 text-s text-gray-500">
									Delete
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-300">

							<!--Recorre la tabla-->

							{#each trabajos as t}
								{#each coches as c}
									{#if c.id === t.id_coche}
														
										<tr class="whitespace-nowrap">
											<td class="px-6 py-4 text-sm text-gray-500">
												{t.nombre}
											</td>
											<td class="px-6 py-4">
												<div class="text-sm text-gray-900">
													{t.descripcion}
												</div>
											</td>
											<td class="px-6 py-4">
												<div class="text-sm text-gray-500">{c.marca}</div>
											</td>
											<td class="px-6 py-4 text-sm text-gray-500">
												{c.modelo}
											</td>
											<td class="px-6 py-4 text-sm text-gray-500">
												{c.año}
											</td>
											<td class="px-6 py-4">
												<button on:click={editarElemento(t)}>
													<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-400" fill="none"
														viewBox="0 0 24 24" stroke="currentColor">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
															d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
													</svg>
												</button>
											</td>
											<td class="px-6 py-4">
												<button on:click={eliminarElemento(t.id)}>
													<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-400" fill="none"
														viewBox="0 0 24 24" stroke="currentColor">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
													</svg>
												</button>	
											</td>
										</tr>
									{/if}				
								{/each}
							{/each}
							
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>


<!--Formulario trabajos-->
	<h3>Añadir trabajos</h3>
	<div class="container flex justify-center mx-auto">

	<div id="form" >
		<form class="w-full max-w-sm" on:submit|preventDefault={onSubmitHandler}>
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
						{#each coches as c, i}

						<option value="{c.id}">{c.marca} {c.modelo}</option>

						{/each}

					</select>
				</div>
			</div>
			{#if editar==false}
			<div class="md:flex md:items-center">
				<div class="md:w-1/3"></div>
				<div class="md:w-2/3">
					<button class="shadow bg-green-500 hover:bg-green-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" on:click={mostrarFormulario}>Añadir coche</button>
				</div>
			</div>
			{/if}
			<div class="md:flex md:items-center">
				<div class="md:w-1/3"></div>
				<div class="md:w-2/3">
					{#if editar}
						<button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Editar</button>
					{:else}
						<button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Añadir</button>

					{/if}
					
				</div>
			</div>

		</form>
	</div>
	</div>

	<!--Formulario coches-->

	<div class="container flex justify-center mx-auto">

	<div style="display: none; " id="formCoche">
		<form class="w-full max-w-sm" on:submit|preventDefault={addCoche}>

			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="marca">Marca</label>
				</div>
				<div class="md:w-2/3">
					<input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						bind:value={coche.marca}
						id="marca"
						type="text"
						placeholder="Nombre del producto"
						required
					/>
				</div>
			</div>

			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="modelo">Modelo</label>
				</div>
				<div class="md:w-2/3">
					<input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						bind:value={coche.modelo}
						id="modelo"
						type="text"
						placeholder="Nombre del producto"
						required
					/>
				</div>
			</div>
			
			<div class="md:flex md:items-center mb-6">
				<div class="md:w-1/3">
					<label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="year">Año</label>
				</div>
				<div class="md:w-2/3">			
					<input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						bind:value={coche.año}
						id="año"
						type="text"
						placeholder="Nombre del producto"
						required
					/>
				</div>
			</div>
			<div class="md:flex md:items-center">
				<div class="md:w-1/3"></div>
				<div class="md:w-2/3">
					<button class="shadow bg-red-500 hover:bg-red-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" on:click={cancelar}>Cancelar</button>
				</div>
			</div>	
			
			<div class="md:flex md:items-center">
				<div class="md:w-1/3"></div>
				<div class="md:w-2/3">
					<button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Añadir</button>
				</div>
			</div>	
	
		</form>
	</div>
	</div>




	
</main>

