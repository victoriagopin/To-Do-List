export default function ToDo(){

    return(
        <>
        <header>
            <h1>To Do List</h1>
            <p class="date">Date: 31.01.2025</p>
        </header>
        <main>
            <div class="add-todo">
                <form action="">
                    <h2>Add To Do:</h2>
                    <label for="add-todo">
                        <input type="text" name="todo" id="todo"/>
                        <button>Add</button>
                    </label>
                </form>
            </div>

            <div class="today-todo">
                <h2>Today ToDo's</h2>
                <ul>
                    <li>Study<div class="done-not"><i class="fas fa-check tick"></i><i class="fas fa-edit pen"></i><i class="fas fa-times x"></i></div></li>
                    <li>Do laundry<div class="done-not"><i class="fas fa-check tick"></i><i class="fas fa-edit pen"></i><i class="fas fa-times x"></i></div></li>
                    <li>Go to dance classes<div class="done-not"><i class="fas fa-check tick"></i><i class="fas fa-edit pen"></i><i class="fas fa-times x"></i></div></li>
                </ul>
            </div>

            <div class="done">
                <h2>Done</h2>
                <ul>
                    <li><i class="fas fa-check finished"></i>Walk the dog</li>
                    <li><i class="fas fa-check finished"></i>Do interview</li>
                </ul>
            </div>
        </main>
        </>
    )
}