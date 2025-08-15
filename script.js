//Paso 1: Declaración de variables
console.log("Paso 1: Declaración de variables");

let num1 = 7;
let num2 = 3;
let operacion = "suma";

let historialOperaciones = [];

console.log(`Variables iniciales: num1=${num1}, num2=${num2}, operacion="${operacion}"`);

//Paso 2: Función para realizar las operaciones
console.log("Paso 2: Creación función realizarOperaciones");

/**
 * Función que realiza operaciones matemáticas básicas
 * @param {number} num1 - Primer número
 * @param {number} num2 - Segundo número  
 * @param {string} operacion - Tipo de operación a realizar
 * @returns {number|string} - Resultado de la operación o mensaje de error
 */
function realizarOperacion(num1, num2, operacion) {
    console.log(`Ejecutando realizarOperacion(${num1}, ${num2}, "${operacion}")`);

    //Paso 3: Validaciones de datos y operaciones
    console.log("Paso 3: Realizando validaciones con estructuras condicionales");

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    //Validación 1: Validación de la operación
    if (operacion !== "suma" && operacion !== "resta" && operacion !== "multiplicacion" && operacion !== "division") {
        console.log("Error: Operación no valida detectada");
        return "Error: Operación no válida. Use: suma, resta, multiplicación o división";
    }

    //Validación 2: de los numeros ingresado
    if (isNaN(num1) || isNaN(num2)) {
        console.log("Error: Números inválidos detectados");
        return "Error: Debe ingresar números válidos";
    }

    //Validación 3: de la división por cero
    if (operacion === "division" && num2 === 0) {
        console.log("Error: División por cero detectada");
        return "Error: No se puede dividir por cero";
    }

    console.log("Todas las validaciones pasaron correctamente");

    //  REALIZAR OPERACIÓN USANDO IF...ELSE IF...ELSE 
    let resultado; //Variable para almacenar resultado

    if (operacion === "suma") {
        resultado = num1 + num2;
        console.log(`Suma realizada: ${num1} + ${num2} = ${resultado}`);
    } else if (operacion === "resta") {
        resultado = num1 - num2;
        console.log(`Resta realizada: ${num1} - ${num2} = ${resultado}`);
    } else if (operacion === "multiplicacion") {
        resultado = num1 * num2;
        console.log(`Multiplicación realizada: ${num1} * ${num2} = ${resultado}`);
    } else if (operacion === "division") {
        resultado = num1 / num2;
        console.log(`División realizada: ${num1} ÷ ${num2} = ${resultado}`);
    } else {
        console.log("Error: Operación no reconocida en la estructura condicional");
        resultado = "Error: Operación no reconocida";
    }
    return resultado;
}

/**
 * FUNCIÓN AUXILIAR PARA OBTENER EL SÍMBOLO DE LA OPERACIÓN
 * @param {string} operacion - Nombre de la operación
 * @returns {string} - Símbolo matemático correspondiente
 */
function getOperacionSimbolo(operacion) {
    console.log(`Obteniendo símbolo para operación: "${operacion}"`);
    
    if (operacion === "suma") return "+";
    else if (operacion === "resta") return "-";
    else if (operacion === "multiplicacion") return "×";
    else if (operacion === "division") return "÷";
    else return "?";
}

// Definir la función globalmente para asegurar accesibilidad
window.getOperacionSimbolo = getOperacionSimbolo;

//Función para calcular desde la interfaz
console.log("Creando funciones de interfaz para HTML");

function calcular() {
    console.log("Usuario hizo clic en el boton Calcular");

    let input1 = document.getElementById('numero1');
    let input2 = document.getElementById('numero2');
    let selectOperacion = document.getElementById('operacion');
    
    // Extraer los valores de los campos
    let numero1 = parseFloat(input1.value);
    let numero2 = parseFloat(input2.value);
    let operacionSeleccionada = selectOperacion.value;
    
    console.log(`Datos ingresados: ${numero1}, ${numero2}, "${operacionSeleccionada}"`);

    // VALIDAR QUE TODOS LOS CAMPOS ESTÉN LLENOS
    if (isNaN(numero1)) {
        alert("Por favor, ingrese el primer número");
        input1.focus();
        return;
    }
    
    if (isNaN(numero2)) {
        alert("Por favor, ingrese el segundo número");
        input2.focus();
        return;
    }
    
    if (operacionSeleccionada === "") {
        alert("Por favor, seleccione una operación");
        selectOperacion.focus();
        return;
    }

    // LLAMAR A LA FUNCIÓN DEL LABORATORIO 
    let resultado = realizarOperacion(numero1, numero2, operacionSeleccionada);
    
    // MOSTRAR EL RESULTADO 
    mostrarResultado(numero1, numero2, operacionSeleccionada, resultado);
    
    // AGREGAR AL HISTORIAL 
    agregarAlHistorial(numero1, numero2, operacionSeleccionada, resultado);
}

/**
 * FUNCIÓN PARA MOSTRAR EL RESULTADO EN LA INTERFAZ
 */
function mostrarResultado(num1, num2, operacion, resultado) {
    console.log("Mostrando resultado en la interfaz...");
    
    let panelResultado = document.getElementById('resultado-panel');
    let contenidoResultado = document.getElementById('resultado-contenido');

    if (!panelResultado || !contenidoResultado) {
        console.error("Error: No se encontraron los elementos del panel de resultados");
        alert(`Resultado: ${num1} ${getOperacionSimbolo(operacion)} ${num2} = ${resultado}`);
        return;
    }

    let simbolo = getOperacionSimbolo(operacion);

    let contenidoHTML;
    if (typeof resultado === 'string' && resultado.includes('Error')) {
        contenidoHTML = `
            <div class="error">
                <h3> Error en la operación</h3>
                <p><strong>Operación:</strong> ${num1} ${simbolo} ${num2}</p>
                <p><strong>Error:</strong> ${resultado}</p>
            </div>
        `;
        console.log("Se mostró un error al usuario");
    } else {
        contenidoHTML = `
            <div class="success">
                <h3>Operación realizada exitosamente</h3>
                <p><strong>Cálculo:</strong> ${num1} ${simbolo} ${num2} = <span style="font-size: 1.2em; color: #155724;">${resultado}</span></p>
                <p><strong>Tipo:</strong> ${operacion.charAt(0).toUpperCase() + operacion.slice(1)}</p>
            </div>
        `;
        console.log(`Resultado mostrado: ${resultado}`);
    }

    contenidoResultado.innerHTML = contenidoHTML;
    panelResultado.style.display = 'block';
    
    // Hacer scroll suave hacia el resultado (con verificación)
    if (panelResultado.scrollIntoView) {
        panelResultado.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }
}

/**
 * FUNCIÓN PARA AGREGAR OPERACIÓN AL HISTORIAL
 */
function agregarAlHistorial(num1, num2, operacion, resultado) {
    console.log(" Agregando operación al historial...");
    
    let operacionHistorial = {
        numero1: num1,
        numero2: num2,
        operacion: operacion,
        resultado: resultado,
        fecha: new Date().toLocaleString()
    };
    
    historialOperaciones.push(operacionHistorial);
    
    console.log(`Historial actualizado. Total de operaciones: ${historialOperaciones.length}`);
    
    // Actualizar la visualización del historial
    actualizarHistorialVisual();
}

/**
 * FUNCIÓN PARA ACTUALIZAR LA VISUALIZACIÓN DEL HISTORIAL
 */
function actualizarHistorialVisual() {
    let panelHistorial = document.getElementById('historial-panel');
    let contenidoHistorial = document.getElementById('historial-contenido');
    
    // Verificar que los elementos existan
    if (!panelHistorial || !contenidoHistorial) {
        console.warn("Advertencia: No se encontraron los elementos del historial");
        return;
    }
    
    // Si no hay operaciones, ocultar el panel
    if (historialOperaciones.length === 0) {
        panelHistorial.style.display = 'none';
        return;
    }
    
    let historialHTML = '';
    
    historialOperaciones.forEach(function(op, index) {
        let simbolo = getOperacionSimbolo(op.operacion);
        
        historialHTML += `
            <div class="historial-item">
                <strong>Operación #${index + 1}:</strong> ${op.numero1} ${simbolo} ${op.numero2} = ${op.resultado}
                <br><small>${op.fecha}</small>
            </div>
        `;
    });
    
    contenidoHistorial.innerHTML = historialHTML;
    panelHistorial.style.display = 'block';
}

/**
 * ALIAS PARA COMPATIBILIDAD - actualizarHistorial() llama a actualizarHistorialVisual()
 */
function actualizarHistorial() {
    actualizarHistorialVisual();
}

/**
 * FUNCIÓN PARA LIMPIAR TODOS LOS CAMPOS
 */
function limpiarCampos() {
    console.log("Limpiando campos del formulario...");
    
    let input1 = document.getElementById('numero1');
    let input2 = document.getElementById('numero2');
    let selectOperacion = document.getElementById('operacion');
    let panelResultado = document.getElementById('resultado-panel');
    
    if (input1) input1.value = '';
    if (input2) input2.value = '';
    if (selectOperacion) selectOperacion.value = '';
    if (panelResultado) panelResultado.style.display = 'none';
    
    if (input1) input1.focus();
    
    console.log("Campos limpiados correctamente");
}

/**
 * FUNCIÓN PARA LIMPIAR EL HISTORIAL
 */
function limpiarHistorial() {
    console.log(" Limpiando historial de operaciones...");
    
    let confirmacion = confirm("¿Está seguro de que desea limpiar todo el historial?");
    
    if (confirmacion) {
        historialOperaciones = [];
        
        let panelHistorial = document.getElementById('historial-panel');
        if (panelHistorial) {
            panelHistorial.style.display = 'none';
        }
        
        console.log("Historial limpiado correctamente");
        alert("Historial limpiado exitosamente");
    } else {
        console.log("Usuario canceló la limpieza del historial");
    }
}

// ============= PASO 4: BUCLE WHILE PARA MÚLTIPLES OPERACIONES =============
console.log("PASO 4: Creando función con bucle while...");

/**
 * FUNCIÓN QUE SIMULA EL BUCLE WHILE DEL LABORATORIO
 */
function demostrarBucleWhile() {
    console.log("\n" + "=".repeat(60));
    console.log("DEMOSTRANDO BUCLE WHILE DEL LABORATORIO");
    console.log("=".repeat(60));
    
    let operacionUsuario = "";
    let iteracion = 1;
    
    while (operacionUsuario !== "salir") {
        console.log(`\n--- ITERACIÓN ${iteracion} DEL BUCLE WHILE ---`);
        
        let numero1, numero2, operacionActual;
        
        if (iteracion === 1) {
            numero1 = 15;
            numero2 = 3;
            operacionActual = "suma";
        } else if (iteracion === 2) {
            numero1 = 20;
            numero2 = 8;
            operacionActual = "resta";
        } else if (iteracion === 3) {
            numero1 = 7;
            numero2 = 4;
            operacionActual = "multiplicacion";
        } else if (iteracion === 4) {
            numero1 = 16;
            numero2 = 2;
            operacionActual = "division";
        } else if (iteracion === 5) {
            numero1 = 10;
            numero2 = 0;
            operacionActual = "division";
        } else if (iteracion === 6) {
            numero1 = 5;
            numero2 = 3;
            operacionActual = "potencia";
        } else {
            operacionActual = "salir";
        }
        
        operacionUsuario = operacionActual;
        
        if (operacionUsuario !== "salir") {
            console.log(`Datos simulados: num1=${numero1}, num2=${numero2}, operacion="${operacionUsuario}"`);
            
            let resultado = realizarOperacion(numero1, numero2, operacionUsuario);
            
            console.log(`Resultado de la iteración ${iteracion}: ${resultado}`);
            
            console.log("¿Desea realizar otra operación? (Continuando automáticamente...)");
            
            iteracion++;
            
            if (iteracion > 7) {
                operacionUsuario = "salir";
                console.log(" Límite de demostraciones alcanzado, saliendo del bucle...");
            }
        }
    }
    
    console.log("\n" + "=".repeat(60));
    console.log("BUCLE WHILE TERMINADO - DEMOSTRACIÓN COMPLETADA");
    console.log("¡Gracias por ver la demostración del bucle while!");
    console.log("=".repeat(60));
}

/**
 * FUNCIÓN PARA SALIR DE LA APLICACIÓN
 */
function salir() {
    console.log("Usuario quiere salir de la aplicación...");
    
    let confirmacion = confirm(`👋 ¿Está seguro de que desea salir?

Resumen de la sesión:
• Total de operaciones realizadas: ${historialOperaciones.length}
• Calculadora funcionó correctamente

¡Gracias por usar la Calculadora JavaScript!`);
    
    if (confirmacion) {
        console.log("👋 Usuario confirmó la salida");
        
        alert(` ¡Sesión terminada exitosamente!

Estadísticas finales:
• Operaciones realizadas: ${historialOperaciones.length}
• Laboratorio completado correctamente
• Todos los pasos implementados

¡Hasta la próxima!`);

        document.body.innerHTML = `
            <div style="
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: Arial, sans-serif;
                color: white;
                text-align: center;
            ">
                <div>
                    <h1>👋 ¡Gracias por usar la Calculadora!</h1>
                    <p>Laboratorio completado exitosamente</p>
                    <p>Recarga la página para usar nuevamente</p>
                    <button onclick="location.reload()" style="
                        padding: 15px 30px;
                        background: #28a745;
                        color: white;
                        border: none;
                        border-radius: 25px;
                        font-size: 16px;
                        cursor: pointer;
                        margin-top: 20px;
                    ">🔄 Recargar Página</button>
                </div>
            </div>
        `;
        
        console.log("Aplicación terminada");
    } else {
        console.log(" Usuario canceló la salida, continuando...");
    }
}

/**
 * Función que implementa un bucle while para realizar múltiples operaciones
 */
function iniciarBucle() {
    let continuar = true;
    let contador = 0;
   
    alert("Iniciando modo bucle. Use 'salir' en la operación para terminar.");
   
    while (continuar && contador < 20) {
        contador++;
       
        let num1 = prompt(`Operación ${contador} - Ingrese el primer número:`);
        if (num1 === null) break;
       
        let num2 = prompt(`Operación ${contador} - Ingrese el segundo número:`);
        if (num2 === null) break;
       
        let operacion = prompt(`Operación ${contador} - Ingrese la operación (suma, resta, multiplicacion, division) o 'salir' para terminar:`);
        if (operacion === null) break;
       
        if (operacion.toLowerCase() === "salir") {
            alert("👋 ¡Gracias por usar la calculadora! Hasta luego.");
            continuar = false;
            break;
        }
       
        const resultado = realizarOperacion(num1, num2, operacion.toLowerCase());
       
        // Obtener símbolo de manera segura
        let simbolo = "+"; // Valor por defecto
        try {
            simbolo = getOperacionSimbolo(operacion.toLowerCase());
        } catch (error) {
            console.error("Error al obtener símbolo:", error);
        }
        
        alert(`Resultado: ${num1} ${simbolo} ${num2} = ${resultado}`);
        // Agregar al historial de manera segura
        let simboloHistorial = "+"; // Valor por defecto
        try {
            simboloHistorial = getOperacionSimbolo(operacion.toLowerCase());
        } catch (error) {
            console.error("Error al obtener símbolo para historial:", error);
        }
        
        historialOperaciones.push({
            numero1: parseFloat(num1),
            numero2: parseFloat(num2),
            operacion: operacion.toLowerCase(),
            resultado: resultado,
            fecha: new Date().toLocaleString()
        });
       
        const seguir = confirm("¿Desea realizar otra operación?");
        if (!seguir) {
            alert("👋 ¡Gracias por usar la calculadora!");
            continuar = false;
        }
    }
   
    actualizarHistorialVisual();
}

/**
 * Función que se ejecuta automáticamente cuando la página termina de cargar
 */
window.onload = function() {
    console.log(" Inicializando calculadora...");
    
    // Usar las variables globales definidas al inicio
    console.log("Variables iniciales declaradas en el Paso 1:");
    console.log("num1:", num1);
    console.log("num2:", num2);
    console.log("operacion:", operacion);
   
    // Realizar una operación de prueba con las variables iniciales
    const resultadoInicial = realizarOperacion(num1, num2, operacion);
    console.log(`Operación de prueba inicial: ${num1} + ${num2} = ${resultadoInicial}`);
   
    // Agregar la operación inicial al historial como ejemplo
    historialOperaciones.push({
        numero1: num1,
        numero2: num2,
        operacion: operacion,
        resultado: resultadoInicial,
        fecha: new Date().toLocaleString() + " (Ejemplo inicial)"
    });
    
    actualizarHistorialVisual();
   
    console.log("✅ Calculadora inicializada correctamente");
    console.log("🔧 Funcionalidades disponibles:");
    console.log("   - Interfaz visual con campos de entrada");
    console.log("   - Modo bucle interactivo con prompts");
    console.log("   - Historial de operaciones");
    console.log("   - Validaciones de entrada y errores");
};

/**
 * FUNCIÓN PARA MANEJAR LA TECLA ENTER EN LOS CAMPOS
 */
function configurarEventosTeclado() {
    let campos = ['numero1', 'numero2', 'operacion'];
    
    campos.forEach(function(campoId) {
        let campo = document.getElementById(campoId);
        if (campo) {
            campo.addEventListener('keypress', function(evento) {
                if (evento.key === 'Enter') {
                    evento.preventDefault();
                    calcular();
                }
            });
        }
    });
}

// Configurar eventos de teclado cuando la página carga
window.addEventListener('DOMContentLoaded', function() {
    configurarEventosTeclado();
    console.log(" Eventos de teclado configurados (Enter para calcular)");
});

