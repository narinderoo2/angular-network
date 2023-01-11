import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestComponent } from './test.component';

describe('TestComponent', () => {

  // Arrange
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    //  configure testing module
    // module - import components,providers etc
    
    await TestBed.configureTestingModule({
      imports:[],
      declarations: [ TestComponent ],
      providers: [  ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // if we have 10 sepcs
  it('should create', () => {

    // Act
    let testComponentActive = false;

    // Assert
    expect(component).toBeTruthy();
  });
});


/*

- Import the required classeds and interfaces
  async,TestBed , ComponentFixturez
  @angular/core/testing

- Import Componets required for testing
  for which we are writing our tests

- describe("testComponent",()=>{

})

- Inside descibe we will have it funtions

   describe("testComponent",()=>{
      it("test case #1",()=>{

      })
    })


- We create fixture for component for component and template
  what is a fixture?
    - it wrapper around the component and the template
    - using fixture - we can get properties of component class and template
  
- BeforeEach - method
  before running test scripts - we need some ground work
    - setting up componet
    - setting up data
    - importing service etc etc etc
  
- TestBed - main utility to define our module , components etc


---------------------------------------------------------------------------

- configureTestingModule method to setup a module enviroment
    ngModule class and you can do everything that you can do with an angular Module
    almost all interview
    explain configure test module

-  we can also use TestBed to create componets
    TestBed createComponent method
    fixture

- Fixture 
    its a wrapper around component and its template
    In simple words - using fixture we can access the componets class properties as well as 

- TestBed - Pipe,Directive,module which you cannot provide date directly
    override to mock data



*/