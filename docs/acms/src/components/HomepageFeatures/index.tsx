import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Monitoring',
    Svg: require('@site/static/img/undraw_surveillance.svg').default,
    description: <>Track student activities during contests.</>,
  },
  {
    title: 'Contest Access',
    Svg: require('@site/static/img/undraw_chore_list.svg').default,
    description: (
      <>
        Offers easy access to a list of ongoing contests and an archive of past
        contests for reference and analysis.
      </>
    ),
  },
  {
    title: 'Customized for A2SV',
    Svg: require('@site/static/img/undraw_advanced_customization.svg').default,
    description: (
      <>
        Tailored to meet specific organizational needs, allowing for flexible
        customization and adaptability.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
