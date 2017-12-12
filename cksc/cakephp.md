# Welcome to CakePHP 3

CakePHP 3 is a web development framework running on PHP 7.1 (min. PHP 5.6.0)

The key elements in a CakePHP application:

- The CakePHP request cycle
- The conventions that CakePHP uses.
- Controllers handle requests and co-ordinate your models and the responses your application creates.
- Views are the presentation layer in your application. They give you powerful tools to create HTML, JSON and the other outputs your application needs.
- Models are the key ingredient in any application. They handle validation, and domain logic within your application.

## Getting Started

CakePHP is designed to make common web-development tasks simple, and easy.

### Conventions Over Configuration

CakePHP provides a basic organizational structure that covers class names, filenames, database table names, and other conventions

By naming the pieces of your application using CakePHP conventions, you gain functionality without the hassle and maintenance tethers of configuration. Here’s a final example that ties the conventions together:

	Database table: “articles”
	Table class: `ArticlesTable`, found at `src/Model/Table/ArticlesTable.php`
	Entity class: `Article`, found at `src/Model/Entity/Article.php`
	Controller class: `ArticlesController`, found at `src/Controller/ArticlesController.php`
	View template, found at `src/Template/Articles/index.ctp`

#### Controller Conventions

Controller class names are plural, PascalCased, and end in `Controller`. `UsersController` and `ArticleCategoriesController` are both examples of conventional controller names.

> Public methods on Controllers are often exposed as ‘actions’ accessible through a web browser. For example the `/users/view` maps to the `view()` method of the `UsersController` out of the box. Protected or private methods cannot be accessed with routing.

#### URL Considerations for Controller Names

As you’ve just seen, single word controllers map to a simple lower case URL path. For example, **`UsersController`** (which would be defined in the file name **UsersController.php**) is accessed from [http://example.com/users](http://example.com/users "http://example.com/users").

When you create links using `this->Html->link()`, you can use the following conventions for the url array:


	$this->Html->link('link-title', [
    	'prefix' => 'MyPrefix' // PascalCased
    	'plugin' => 'MyPlugin', // PascalCased
    	'controller' => 'ControllerName', // PascalCased
    	'action' => 'actionName' // camelBacked
	]


for more information on cakephp urls and parameter handling, see [connecting routes.](https://book.cakephp.org/3.0/en/development/routing.html#routes-configuration "routing - 3.x")

#### File and Class Name Conventions

In general, filenames match the class names, and follow the PSR-4 standard for autoloading

- The Controller class **`LatestArticlesController`** would be found in a file named **LatestArticlesController.php**
- The Component class **`MyHandyComponent`** would be found in a file named **MyHandyComponent.php**
- The Table class **`OptionValuesTable`** would be found in a file named **OptionValuesTable.php**
- The Entity class **`OptionValue`** would be found in a file named **OptionValue.php**.
- The Behavior class **`EspeciallyFunkableBehavior`** would be found in a file named **EspeciallyFunkableBehavior.php**
- The View class **`SuperSimpleView`** would be found in a file named **SuperSimpleView.php**
- The Helper class **`BestEverHelper`** would be found in a file named **BestEverHelper.php**

#### Database Conventions

- Table names corresponding to CakePHP models are plural and underscored. `users, article_categories, and user_favorite_pages`
- Field/Column names with two or more words are underscored: `first_name`.
- Foreign keys in hasMany, belongsTo/hasOne relationships are recognized by default as the (singular) name of the related table followed by `_id`: `article_category_id`
- Join tables, used in **BelongsToMany** relationships between models, should be named after the model tables they will join or the bake command won’t work, arranged in alphabetical order (`articles_tags` rather than `tags_articles`).


#### Model Conventions

Table class names are plural, PascalCased and end in Table. **UsersTable**, **ArticleCategoriesTable**, and **UserFavoritePagesTable** are all examples of table class names matching the `users`, `article_categories` and `user_favorite_pages` tables respectively.

#### View Conventions

View template files are named after the controller functions they display, in an underscored form. The **viewAll**() function of the **ArticlesController** class will look for a view template in `src/Template/Articles/view_all.ctp.`

The basic pattern is `src/Template/Controller/underscored_function_name.ctp.`

### The Model Layer

The Model layer represents the part of your application that implements the business logic.

	use Cake\ORM\TableRegistry;
	
	$users = TableRegistry::get('Users');
	$query = $users->find();
	foreach ($query as $row) {
	    echo $row->username;
	}

If we wanted to make a new user and save it (with validation) we would do something like:

	use Cake\ORM\TableRegistry;
	
	$users = TableRegistry::get('Users');
	$user = $users->newEntity(['email' => 'mark@example.com']);
	$users->save($user);

### The View Layer

The View layer renders a presentation of modeled data

	// In a view template file, we'll render an 'element' for each user.
	<?php foreach ($users as $user): ?>
	    <li class="user">
	        <?= $this->element('user_info', ['user' => $user]) ?>
	    </li>
	<?php endforeach; ?>

### The Controller Layer

The Controller layer handles requests from users. It is responsible for rendering a response with the aid of both the Model and the View layers.

	public function add()
	{
	    $user = $this->Users->newEntity();
	    if ($this->request->is('post')) {
	        $user = $this->Users->patchEntity($user, $this->request->getData());
	        if ($this->Users->save($user, ['validate' => 'registration'])) {
	            $this->Flash->success(__('You are now registered.'));
	        } else {
	            $this->Flash->error(__('There were some problems.'));
	        }
	    }
	    $this->set('user', $user);
	}

### CakePHP Request Cycle

![https://book.cakephp.org/3.0/en/_images/typical-cake-request.png](https://book.cakephp.org/3.0/en/_images/typical-cake-request.png)

1. The webserver rewrite rules direct the request to **webroot/index.php.**
1. Your Application is loaded and bound to an **HttpServer**.
1. Your application’s middleware is initialized.
1. A request and response is dispatched through the PSR-7 Middleware that your application uses. Typically this includes error trapping and routing.
1. If no response is returned from the middleware and the request contains routing information, a controller & action are selected.
1. The controller’s action is called and the controller interacts with the required Models and Components.
1. The controller delegates response creation to the View to generate the output resulting from the model data.
1. The view uses Helpers and Cells to generate the response body and headers.
1. The response is sent back out through the [Middleware](https://book.cakephp.org/3.0/en/controllers/middleware.html "https://book.cakephp.org/3.0/en/controllers/middleware.html").
1. The **HttpServer** emits the response to the webserver.

## Installation

### Requirements

- HTTP Server. For example: Apache. Having mod_rewrite is preferred, but by no means required.
- PHP 5.6.0 or greater (including PHP 7.1).
- mbstring PHP extension
- intl PHP extension
- simplexml PHP extension

### Using CakePHP

- Check PHP version and PHP CLI by command `php -v`
- Installing [Composer](https://getcomposer.org/ "https://getcomposer.org/")
- Create a CakePHP Project
	`composer self-update && composer create-project --prefer-dist cakephp/app my_app_name`
