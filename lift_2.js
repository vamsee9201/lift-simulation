let liftState = [];
let floorButtons = [];
let numberOfFloors = 0;
let numberOfLifts = 0;

function generateBuilding() {
    numberOfFloors = parseInt(document.getElementById('floors').value);
    numberOfLifts = parseInt(document.getElementById('lifts').value);
    const building = document.getElementById('building');
    building.innerHTML = '';

    // Initialize lift state
    liftState = Array.from({ length: numberOfLifts }, () => 0);
    
    // Create floors
    for (let i = 0; i < numberOfFloors; i++) {
        const floor = document.createElement('div');
        floor.className = 'floor';

        // Create lift buttons
        const button = document.createElement('div');
        button.className = 'button';
        button.innerText = i;
        button.onclick = () => callLift(i);
        floor.appendChild(button);
        floorButtons.push(button);

        // Create lift containers
        for (let j = 0; j < numberOfLifts; j++) {
            const lift = document.createElement('div');
            lift.className = 'lift';
            lift.id = `lift-${j}-${i}`; // Unique ID for each lift on each floor
            if (i === 0) { // Initially place lifts on the ground floor
                floor.appendChild(lift);
            }
        }

        building.appendChild(floor);
    }
}

function callLift(floor) {
    // Find the nearest lift
    let nearestLift = 0;
    let minDistance = Math.abs(liftState[0] - floor);

    for (let i = 1; i < liftState.length; i++) {
        const distance = Math.abs(liftState[i] - floor);
        if (distance < minDistance) {
            minDistance = distance;
            nearestLift = i;
        }
    }

    // Move the lift
    moveLift(nearestLift, floor);
}

function moveLift(liftIndex, floor) {
    const currentFloor = liftState[liftIndex];
    const distance = Math.abs(currentFloor - floor);
    const travelTime = distance * 2000; // 2 seconds per floor

    const lift = document.getElementById(`lift-${liftIndex}-${currentFloor}`);
    lift.style.transition = `transform ${travelTime}ms linear`;
    lift.style.transform = `translateY(-${floor * 50}px)`;

    // Update lift state
    liftState[liftIndex] = floor;

    // Simulate door opening and closing
    setTimeout(() => {
        openDoors(lift);
        setTimeout(() => {
            closeDoors(lift);
            updateLiftPosition(liftIndex, currentFloor, floor);
        }, 2500); // Doors stay open for 2.5 seconds
    }, travelTime);
}

function openDoors(lift) {
    lift.style.backgroundColor = 'green'; // Indicating doors open
}

function closeDoors(lift) {
    lift.style.backgroundColor = 'gray'; // Indicating doors closed
}

function updateLiftPosition(liftIndex, fromFloor, toFloor) {
    const oldLift = document.getElementById(`lift-${liftIndex}-${fromFloor}`);
    const newLiftContainer = document.getElementById(`lift-${liftIndex}-${toFloor}`).parentNode;
    oldLift.remove();
    
    const newLift = document.createElement('div');
    newLift.className = 'lift';
    newLift.id = `lift-${liftIndex}-${toFloor}`;
    newLift.style.backgroundColor = 'gray';
    newLiftContainer.appendChild(newLift);
}
