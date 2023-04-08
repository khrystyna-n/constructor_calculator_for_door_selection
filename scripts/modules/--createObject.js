class CreateObject {
  constructor(id, classN, child, props) {
    (this.id = id),
      (this.classN = classN),
      (this.child = child),
      (this.props = props);
  }

  createOptions() {
    return {
      id: this.id,
      classN: this.classN,
      child: this.child,
      props: this.props,
    };
  }
}

class CreateObjProps {
  constructor(width, height, move, type, price) {
      this.width = width,
      this.height = height,
      this.move = move,
      this.type = type,
      this.price = price
  }

  createProps() {
    return {
      width: this.width,
      height: this.height,
      move: this.move,
      wheels: {
        type: this.type,
        price: this.price
      }
    };
  }
}

class CreateChildProps extends CreateObject {
  constructor(id, classN, width, height, glass) {
    super(id, classN);
    (this.width = width), (this.height = height), (this.glass = glass);
  }
  createProps() {
    return {
      id: this.id,
      classN: this.classN,
      props: {
        width: this.width,
        height: this.height,
        glass: this.glass,
      },
    };
  }
}

class Divider {
  constructor(id, classN) {
    (this.id = id), (this.classN = classN);
  }
  createDivider() {
    return {
      id: this.id,
      classN: this.classN,
    };
  }
}

class Convertor {
  constructor(id, width, height, glassType) {}
}

export { CreateObject, CreateObjProps, CreateChildProps, Divider };
