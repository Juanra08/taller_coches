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

</main>

