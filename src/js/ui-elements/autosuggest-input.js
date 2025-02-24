import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {
  TextField,
  Paper,
  MenuItem,
  FormControl,
  Typography,
  InputAdornment,
  Icon,
  FormHelperText,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.value, query);
  const parts = parse(suggestion.value, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => (part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 500 }}>
            {part.text}
          </strong>
        )))}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class AutosuggestInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      value: props.value,
      suggestions: [],
    };
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getSuggestions(value) {
    const inputValue = value.trim();
    if (inputValue.length < 2) {
      return [];
    }
    let count = 0;
    return this.props.suggestions.filter((suggestion) => {
      const keep = count < 5 && suggestion.value.match(new RegExp(inputValue, 'i'));
      if (keep) {
        count += 1;
      }
      return keep;
    });
  }

  getSuggestionValue(suggestion) {
    this.setState({
      id: suggestion.id,
    }, () => {
      this.props.onChange({ id: this.state.id, value: this.state.value });
    });
    return suggestion.value;
  }

  handleSuggestionsFetchRequested({ value }) {
    this.setState({
      id: null,
      suggestions: this.getSuggestions(value),
    });
  }

  handleSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  handleChange(event, { newValue }) {
    this.setState({
      value: newValue,
    }, () => {
      this.props.onChange({ id: this.state.id, value: this.state.value });
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <FormControl
        error={Boolean(this.props.error)}
        className="form-control"
      >
        <Typography className="label">{this.props.label}</Typography>
        <Autosuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderInputComponent={renderInput}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            classes,
            className: this.props.className,
            placeholder: 'Start typing to search...',
            value: this.state.value,
            onChange: this.handleChange,
            endAdornment: <InputAdornment position="end"><Icon>{this.props.id ? 'link' : 'link_off'}</Icon></InputAdornment>,
          }}
        />
        <FormHelperText>
          {this.props.error ? this.props.error.detail : ''}
        </FormHelperText>
      </FormControl>
    );
  }
}

AutosuggestInput.defaultProps = {
  suggestions: [],
  id: null,
  value: '',
  error: {},
  className: '',
};

AutosuggestInput.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.any,
  value: PropTypes.string,
  error: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(AutosuggestInput);
