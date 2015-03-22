var TodoBox = React.createClass({
    updateState: function(data) {
	var tasks = data["tasks"];
	this.setState({
	    data: data["tasks"],
	    unfinished: this.countUnfinishedItems(tasks)
	});
    },
    getInitialState: function() {
	return {data: [], unfinished: 0};
    },
    loadTodosFromServer: function() {
	$.ajax({
	    url: this.props.url,
	    dataType: 'json',
	    success: function(data) {
		this.updateState(data);
	    }.bind(this),
	    error: function(data) {
		console.error(this.props.url, status, err.toString());
	    }.bind(this)
	});
    },
    componentDidMount: function() {
	this.loadTodosFromServer();
    },
    handleTodoSubmit: function(todo) {
	$.ajax({
	    url: this.props.url,
	    dataType: 'json',
	    contentType: 'application/json',
	    type: 'POST',
	    data: JSON.stringify({task: todo}),
	    success: function(data) {
		this.updateState(data);
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
	    }.bind(this)
	});
    },
    toggleTodo: function(todo) {
	$.ajax({
	    url: this.props.url,
	    dataType: 'json',
	    contentType: 'application/json',
	    type: 'PUT',
	    data: JSON.stringify({tasks:
		[
		    {
			id: todo.id,
			complete: !todo.complete
		    }
		]
	    }),
	    success: function(data) {
		this.updateState(data);
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
	    }.bind(this)
	});
    },
    countUnfinishedItems: function(data) {
	var unfinished = 0;
	for (var i = 0; i < data.length; i++) {
	    if (data[i]["complete"] === false) {
		unfinished++;
	    }
	}
	return unfinished;
    },
    render: function() {
	return (
		<div id="todo-box">
		    <h1 id="todo-header">Todos</h1>
		    <TodoInput onTodoSubmit={this.handleTodoSubmit} />
		    <TodoList data={this.state.data} onToggle={this.toggleTodo}/>
		    <TodoFooter itemsLeft={this.state.unfinished}/>
		</div>
	);
    }
});

var TodoInput = React.createClass({
    handleSubmit: function(e) {
	e.preventDefault();
	var todo = React.findDOMNode(this.refs.todo).value.trim();
	React.findDOMNode(this.refs.todo).value = '';
	if (!todo) {
	    return;
	}
	this.props.onTodoSubmit(todo)
    },
    render: function() {
	return (
		<div id="todo-input">
		<form className="todo-input" onSubmit={this.handleSubmit}>
		    <div id="todo-input-box">
		        <input type="text" className="form-control" ref="todo" placeholder="What needs to be done?" />
		    </div>
		    <div id="todo-input-button">
		        <button type="submit" id="todo-input-button" className="btn">Add Todo</button>
		    </div>
		</form>
		<div className="clear"></div>
		</div>
	);
    }
});

var TodoList = React.createClass({
    toggle: function(todo) {
	this.props.onToggle(todo);
    },
    render: function() {
	if (this.props.data.length > 0) {
	    var taskNodes = this.props.data.map(function (item) {
		return (
			<TodoItem
		           task={item["task"]}
		           key={item["id"]}
		           complete={item["complete"]}
		           onToggle={this.toggle.bind(this, item)}
			/>
		);
	    }, this);
}
	return (
	    <div id="todo-list">
		{taskNodes}
	    </div>
	);
    }
});

var TodoItem = React.createClass({
    render: function() {
	var classes;

	if (this.props.complete) {
	    classes = "complete";
	} else {
	    classes = ""
	}

	return (
		<div className="todo-item">
		    <div className="todo-checkbox">
		        <input checked={this.props.complete} onChange={this.props.onToggle} type="checkbox"/>
		    </div>
		    <div className={classes}>
		        {this.props.task}
	            </div>
		</div>
	);
    }
});

var TodoFooter = React.createClass({
    render: function() {
	return (
		<div id="todo-footer">
		<div id="items-left">
		{this.props.itemsLeft} items left
		</div>
		<div id="mark-complete">
		<a href="#">Mark all as complete</a>
		</div>
		<div className="clear"></div>
		</div>
	);
    }
});