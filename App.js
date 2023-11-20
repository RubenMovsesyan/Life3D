// constants
const UPDATE_INTERVAL = 50; // ms


const canvas = document.querySelector('canvas');


// Setup WebGPU ------------------------------------------------
// check if webgpu is supported
if (!navigator.gpu) {
    throw new Error('WebGPU not supported on this browser.');
}

// request and adapter and device
const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
    throw new Error('No appropriate GPUAdapter found.');
}

// device is the main interface through which most interaction with the GPU happens
const device = await adapter.requestDevice();
if (!device) {
    throw new Error('No appropriate GPUDevice found.');
}

// configuring the canvas
const context = canvas.getContext('webgpu');
const canvas_format = navigator.gpu.getPreferredCanvasFormat();
context.configure({
    device: device,
    format: canvas_format,
});

// Setup WebGPU ------------------------------------------------

// WebGPU update function
function update() {
    const encoder = device.createCommandEncoder();

    const pass = encoder.beginRenderPass({
        colorAttachments: [{
            view: context.getCurrentTexture().createView(),
            loadOp: 'clear',
            storeOp: 'store',
            clearValue: {
                r: 0.4,
                g: 0,
                b: 0,
                a: 1,
            },
        }]
    });

    // render all other objects here ---------------------------



    // ---------------------------------------------------------
    pass.end();

    // configuring the canvas
    const command_buffer = encoder.finish();

    device.queue.submit([command_buffer]);
}

setInterval(update, UPDATE_INTERVAL);