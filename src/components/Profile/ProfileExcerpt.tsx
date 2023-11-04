type ProfileExcerptProps = {
  title: string;
  data: string | undefined;
};

const ProfileExcerpt = ({ title, data }: ProfileExcerptProps) => {
  return (
    <div className="profile__info__wrapper">
      <h4 className="profile__info__heading">{title}:</h4>
      <p className="profile__info__data">{data}</p>
    </div>
  );
};

export default ProfileExcerpt;
