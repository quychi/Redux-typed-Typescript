import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import { AppState } from "../store/configureStore";
import { AppActions } from "../types/actions";
import { Expense } from "../types/Expense";

interface HomePageProps {
  id?: string;
  color?: string;
}

interface HomePageState {}

type Props = HomePageProps & LinkStateProp & LinkDispatchProps;

export class HomePage extends React.Component<Props, HomePageState> {
  onEdit = (expense: Expense) => {
    this.props.startEditExpense(expense);
  };
  onRemove = (id: string) => {
    this.props.startRemoveExpense(id);
  };
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <h1>Expense Page</h1>
        <div>
          {expenses.map(expense => (
            <div>
              <p>{expense.description}</p>
              <p>{expense.amount}</p>
              <p>{expense.note}</p>
              <button onClick={() => this.onRemove(expense.id)}>
                Remove Expense
              </button>
              <button onClick={() => this.onEdit(expense)}>Edit Expense</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

interface LinkStateProp {
  expenses: Expense[]
}

interface LinkDispatchProps {
  startEditExpense: (expense: Expense) => void;   //void is the dispatch func normally returns
  startRemoveExpense: (id: string) => void;
}

const mapStateToProps = (state: AppState, ownProps: HomePageProps): LinkStateProp => ({        //chuaw hieeu ve ham nay lam???
  expenses: state.expenses,
  id: ownProps.id                 //then you know whatever ID I specified for the component
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: HomePageProps): LinkDispatchProps => ({//dispatch: thường thì sẽ call dispatch: Dispatch của Redux nhưng ở đây dùng ThunkMiddleware nên phải để type là ThunkDispatch

  //xoas 2 dong nay
  // startEditExpense: expense => dispatch(startEditExpense(expense)),
  // startRemoveExpense: data => dispatch(startRemoveExpense(data))

  startEditExpense: bindActionCreators(startEditExpense, dispatch),//tham so 1 la o file action/express, dispatch la dispatch o tham so truyen vao (type ThunkDispatch)
  startRemoveExpense: bindActionCreators(startRemoveExpense, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
