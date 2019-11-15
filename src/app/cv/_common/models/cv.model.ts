export class ProfileModel {
    profileDetails: string;
    profileFeedback = [];
}

export class SkillsModel {
    programmingLanguages: string[] = [];
    ides: string[] = [];
    operatingSystems: string[] = [];
    devops: string[] = [];
    databases: string[] = [];
    platforms: string[] = [];
    other: string[] = [];
}

export class QualificationModel {
    qualificationDetails: string;
    qualificationFeedback = [];
}

export class WorkExperienceModel {
    jobTitle: string;
    workExperienceDetails: string;
    workExperienceFeedback = [];
}

export class HobbiesModel {
    hobbiesDetails: string;
    hobbiesFeedback = [];
}

export class CvModel {
    versionNumber = 1;
    profile: ProfileModel = new ProfileModel();
    allSkills: SkillsModel[] = [new SkillsModel()];
    allQualifications: QualificationModel[] = [];
    allWorkExperience: WorkExperienceModel[] = [];
    otherWorkExperience: WorkExperienceModel[] = [];
    hobbies: HobbiesModel = new HobbiesModel();
    id: 'standalone';
    status: string;
    userName: string;
    firstName: string;
    surname: string;
    fullName: string;
    cohort: string;
    sourceControlLink: string;
}
